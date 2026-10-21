import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  convertToParamMap,
  provideRouter,
} from '@angular/router';

import { reviewGuard, successGuard } from './booking.guard';
import { flushProvider, flushSlots } from '../../shared/testing/api';
import { BookingStore } from './booking-store';
import { buildBookingDays } from './data/booking.mock';

describe('booking guards', () => {
  const tomorrow = buildBookingDays(new Date(), 2)[1];

  function run(guard: typeof reviewGuard, params: Record<string, string>) {
    const route = { paramMap: convertToParamMap(params) } as ActivatedRouteSnapshot;
    return TestBed.runInInjectionContext(() => guard(route, {} as RouterStateSnapshot));
  }

  function url(result: unknown): string {
    return TestBed.inject(Router).serializeUrl(result as UrlTree);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('sends review back to date and time until a slot is chosen', () => {
    const store = TestBed.inject(BookingStore);
    store.startFor('1');
    flushProvider('1');
    expect(url(run(reviewGuard, { providerId: '1' }))).toBe('/book/1');

    store.date.set(tomorrow.iso);
    flushSlots('1', tomorrow.iso);
    store.slotId.set(`${tomorrow.iso}T13:00`);
    expect(run(reviewGuard, { providerId: '1' })).toBe(true);
    expect(url(run(reviewGuard, { providerId: '2' }))).toBe('/book/2');
  });

  it('only allows the success screen for the confirmed booking', () => {
    const store = TestBed.inject(BookingStore);
    expect(url(run(successGuard, { bookingId: 'SC-000000' }))).toBe('/');

    store.startFor('1');
    flushProvider('1');
    store.typeId.set('2');
    store.date.set(tomorrow.iso);
    flushSlots('1', tomorrow.iso);
    store.slotId.set(`${tomorrow.iso}T13:00`);
    const id = store.confirm()!;
    expect(run(successGuard, { bookingId: id })).toBe(true);
  });
});
