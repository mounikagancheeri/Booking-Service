import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { flushProvider, flushSlots } from '../../../shared/testing/api';
import { BookingStore } from '../booking-store';
import { buildBookingDays } from '../data/booking.mock';
import { Review } from './review';

describe('Review', () => {
  // Tomorrow's 13:00 slot is in the future and never booked by the mock availability rules.
  const tomorrow = buildBookingDays(new Date(), 2)[1];

  async function setup() {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const store = TestBed.inject(BookingStore);
    store.startFor('1');
    flushProvider('1');
    store.typeId.set('2');
    store.date.set(tomorrow.iso);
    flushSlots('1', tomorrow.iso);
    store.slotId.set(`${tomorrow.iso}T13:00`);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(Review);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement, store, navigate };
  }

  it('summarises the professional, service, slot, address and price', async () => {
    const { el } = await setup();
    const text = el.textContent ?? '';
    expect(text).toContain('Rahul Sharma');
    expect(text).toContain('AC General Service');
    expect(text).toContain(`${tomorrow.longLabel} at 01:00 PM`);
    expect(text).toContain('Green Heights');
    expect(text).toContain('Continue to payment (₹999)');
  });

  it('continues to checkout without confirming yet', async () => {
    const { fixture, el, store, navigate } = await setup();
    fixture.componentRef.setInput('providerId', '1');
    await fixture.whenStable();
    const next = Array.from(el.querySelectorAll<HTMLButtonElement>('button[appButton]')).find((b) =>
      b.textContent?.includes('Continue to payment'),
    )!;
    next.click();

    expect(store.confirmed()).toBeNull();
    expect(navigate).toHaveBeenCalledWith(['/book', '1', 'checkout']);
  });
});
