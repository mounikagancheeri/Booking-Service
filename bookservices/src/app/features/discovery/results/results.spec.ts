import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { Results } from './results';

const CATEGORIES = [
  { id: 1, label: 'AC Repair', icon: 'mode_fan', caption: '12 Pros' },
  { id: 2, label: 'Electrician', icon: 'offline_bolt', caption: '24 Pros' },
];

function apiProvider(id: number, name: string, rating: number, priceFrom: number, verified = true) {
  return {
    id,
    name,
    specialization: 'AC Technician',
    categoryId: 1,
    rating,
    reviews: 50,
    experience: 5,
    priceFrom,
    verified,
    location: 'Hyderabad',
    nextAvailable: '2026-10-10T16:00:00',
  };
}

const AC_PROVIDERS = [
  apiProvider(1, 'Rahul Sharma', 4.9, 499),
  apiProvider(2, 'Arjun Reddy', 4.7, 399),
  apiProvider(4, 'Manoj Kumar', 4.5, 650, false),
];

describe('Results', () => {
  async function setup(categoryId = '1', providers: unknown[] = AC_PROVIDERS) {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(Results);
    fixture.componentRef.setInput('categoryId', categoryId);
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/api/categories').flush({ data: CATEGORIES });
    http
      .expectOne(
        (req) =>
          req.url === 'http://localhost:3000/api/providers' &&
          req.params.get('categoryId') === categoryId,
      )
      .flush({ success: true, data: providers });
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const names = () =>
      Array.from(el.querySelectorAll('app-specialist-card h2')).map((h) => h.textContent?.trim());
    const chip = (label: string) =>
      Array.from(el.querySelectorAll<HTMLButtonElement>('button[appFilterChip]')).find((b) =>
        b.textContent?.includes(label),
      )!;
    return { fixture, el, navigate, names, chip };
  }

  it('lists the specialists for the category with the first one selected', async () => {
    const { el, names } = await setup();
    expect(el.querySelector('h1')?.textContent).toContain('AC Repair Specialists');
    expect(names()).toEqual(['Rahul Sharma', 'Arjun Reddy', 'Manoj Kumar']);
    expect(el.querySelectorAll('.card.selected').length).toBe(1);
  });

  it('filters and recovers with Clear filters', async () => {
    const { fixture, el, names, chip } = await setup();
    chip('Verified only').click();
    await fixture.whenStable();
    expect(names()).toEqual(['Rahul Sharma', 'Arjun Reddy']);
    expect(chip('Verified only').getAttribute('aria-pressed')).toBe('true');

    chip('Under ₹500').click();
    chip('4.8+').click();
    await fixture.whenStable();
    expect(names()).toEqual(['Rahul Sharma']);

    chip('Today').click();
    await fixture.whenStable();
    expect(names()).toEqual([]);
    Array.from(el.querySelectorAll<HTMLButtonElement>('button'))
      .find((b) => b.textContent?.includes('Clear filters'))!
      .click();
    await fixture.whenStable();
    expect(names().length).toBe(3);
  });

  it('sorts by lowest price', async () => {
    const { fixture, names, chip } = await setup();
    chip('Sort').click();
    chip('Sort').click();
    await fixture.whenStable();
    expect(chip('Sort').textContent).toContain('Lowest price');
    expect(names()).toEqual(['Arjun Reddy', 'Rahul Sharma', 'Manoj Kumar']);
  });

  it('selects another specialist and books them', async () => {
    const { fixture, el, navigate } = await setup();
    el.querySelectorAll<HTMLElement>('app-specialist-card')[1]
      .querySelector<HTMLButtonElement>('button')!
      .click();
    await fixture.whenStable();
    const book = Array.from(el.querySelectorAll<HTMLButtonElement>('.card.selected button')).find(
      (b) => b.textContent?.includes('Book Now'),
    )!;
    book.click();
    expect(navigate).toHaveBeenCalledWith(['/book', '2', 'service']);
  });

  it('shows a message for an unknown category', async () => {
    const { el } = await setup('99', []);
    expect(el.textContent).toContain("doesn't exist");
  });
});
