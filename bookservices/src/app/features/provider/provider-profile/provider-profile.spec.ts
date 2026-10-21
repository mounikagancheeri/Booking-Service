import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { flushProvider } from '../../../shared/testing/api';
import { BookingStore } from '../../booking/booking-store';
import { ProviderProfile } from './provider-profile';

describe('ProviderProfile', () => {
  async function setup(providerId = '1', found = true) {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const http = TestBed.inject(HttpTestingController);
    const fixture = TestBed.createComponent(ProviderProfile);
    fixture.componentRef.setInput('providerId', providerId);
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/api/categories').flush({
      data: [{ id: 1, label: 'AC Repair', icon: 'mode_fan', caption: '12 Pros' }],
    });
    flushProvider(providerId, { found });
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement, navigate };
  }

  it('loads the provider and their services from the API', async () => {
    const { el } = await setup();
    expect(el.querySelector('#profile-name')?.textContent).toContain('Rahul Sharma');
    expect(el.querySelector('.role')?.textContent).toContain('AC Technician');
    const packages = el.querySelectorAll('app-service-package-card');
    expect(packages.length).toBe(3);
    expect(packages[1].textContent).toContain('AC General Service');
    expect(packages[1].textContent).toContain('₹999');
    const back = el.querySelector<HTMLAnchorElement>('.back-link')!;
    expect(back.textContent).toContain('Back to AC Repair');
    expect(back.getAttribute('href')).toBe('/providers?categoryId=1');
  });

  it('updates the shared booking when a package is picked', async () => {
    const { fixture, el } = await setup();
    el.querySelector<HTMLInputElement>('input[value="1"]')!.click();
    await fixture.whenStable();

    const store = TestBed.inject(BookingStore);
    expect(store.providerId()).toBe('1');
    expect(store.typeId()).toBe('1');
    expect(el.querySelector('app-booking-summary-bar')?.textContent).toContain('AC Inspection');
  });

  it('continues to date and time from the sticky bar once a package is picked', async () => {
    const { fixture, el, navigate } = await setup();
    const cta = el.querySelector<HTMLButtonElement>('app-booking-summary-bar button')!;
    expect(cta.disabled).toBe(true);

    el.querySelector<HTMLInputElement>('input[value="2"]')!.click();
    await fixture.whenStable();
    cta.click();
    expect(navigate).toHaveBeenCalledWith(['/book', '1']);
  });

  it('toggles the saved state', async () => {
    const { fixture, el } = await setup();
    const save = el.querySelector<HTMLButtonElement>('.save')!;
    save.click();
    await fixture.whenStable();
    expect(save.getAttribute('aria-pressed')).toBe('true');
  });

  it('shows a message for an unknown provider', async () => {
    const { el } = await setup('99', false);
    expect(el.textContent).toContain("couldn't find this professional");
  });
});
