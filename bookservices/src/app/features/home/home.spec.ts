import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { CATEGORIES, RAHUL } from '../../shared/ui/fixtures';
import { Home } from './home';

describe('Home', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(Home);
    const http = TestBed.inject(HttpTestingController);
    http
      .expectOne('http://localhost:3000/api/categories')
      .flush({ message: 'ok', data: CATEGORIES });
    http.expectOne('http://localhost:3000/api/providers').flush({
      message: 'ok',
      data: [
        {
          id: RAHUL.id,
          name: RAHUL.name,
          specialization: RAHUL.title,
          categoryId: 'ac-repair',
          rating: RAHUL.rating,
          reviews: RAHUL.reviewCount,
          experience: RAHUL.experienceYears,
          priceFrom: RAHUL.startingPrice,
          verified: true,
          location: 'Banjara Hills',
          nextAvailable: '2026-10-10T16:00:00',
        },
      ],
    });
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement, navigate };
  }

  it('greets the user and lists categories and providers', async () => {
    const { el } = await setup();
    expect(el.querySelector('h1')?.textContent).toContain('Hello, Priya');
    expect(el.querySelectorAll('app-category-tile').length).toBe(6);
    expect(el.textContent).toContain('Rahul Sharma');
    expect(el.textContent).toContain('Suresh Kumar');
  });

  it('opens the results for a tapped category', async () => {
    const { el, navigate } = await setup();
    el.querySelector<HTMLButtonElement>('app-category-tile button')!.click();
    expect(navigate).toHaveBeenCalledWith(['/providers'], {
      queryParams: { categoryId: 'ac-repair' },
    });
  });

  it('starts a booking from the spotlight card', async () => {
    const { el, navigate } = await setup();
    const book = Array.from(
      el.querySelectorAll<HTMLButtonElement>('app-provider-card button'),
    ).find((b) => b.textContent?.includes('Book Service'))!;
    book.click();
    expect(navigate).toHaveBeenCalledWith(['/book', 'rahul-sharma', 'service']);
  });

  it('searches categories by name and reports misses', async () => {
    const { fixture, el, navigate } = await setup();
    const input = el.querySelector<HTMLInputElement>('app-search-bar input')!;
    const form = el.querySelector('app-search-bar form')!;

    input.value = 'plumber';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    expect(el.querySelector('.message')?.textContent).toContain('No services match');

    input.value = 'electric';
    input.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(navigate).toHaveBeenCalledWith(['/providers'], {
      queryParams: { categoryId: 'electrician' },
    });
  });
});
