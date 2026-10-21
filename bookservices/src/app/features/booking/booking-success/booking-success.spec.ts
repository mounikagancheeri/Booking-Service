import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { flushProvider, flushSlots } from '../../../shared/testing/api';
import { BookingStore } from '../booking-store';
import { buildBookingDays } from '../data/booking.mock';
import { BookingSuccess } from './booking-success';

describe('BookingSuccess', () => {
  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const store = TestBed.inject(BookingStore);
    const tomorrow = buildBookingDays(new Date(), 2)[1];
    store.startFor('1');
    flushProvider('1');
    store.typeId.set('2');
    store.date.set(tomorrow.iso);
    flushSlots('1', tomorrow.iso);
    store.slotId.set(`${tomorrow.iso}T13:00`);
    const id = store.confirm()!;

    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(BookingSuccess);
    fixture.componentRef.setInput('bookingId', id);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement, store, id, navigate, tomorrow };
  }

  it('shows the confirmed booking, professional and roadmap', async () => {
    const { el, id, tomorrow } = await setup();
    const text = el.textContent ?? '';
    expect(text).toContain('Booking Confirmed!');
    expect(text).toContain(id);
    expect(text).toContain(`${tomorrow.longLabel} at 01:00 PM`);
    expect(text).toContain('Rahul Sharma');
    expect(el.querySelectorAll('app-service-roadmap li').length).toBe(4);
  });

  it('resets the booking when going home', async () => {
    const { el, store, navigate } = await setup();
    const home = Array.from(el.querySelectorAll<HTMLButtonElement>('button[appButton]')).find((b) =>
      b.textContent?.includes('Back to Home'),
    )!;
    home.click();
    expect(store.providerId()).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/']);
  });
});
