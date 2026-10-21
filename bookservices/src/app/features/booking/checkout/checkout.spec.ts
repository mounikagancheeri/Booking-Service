import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { flushProvider, flushSlots } from '../../../shared/testing/api';
import { BookingStore } from '../booking-store';
import { buildBookingDays } from '../data/booking.mock';
import { Checkout } from './checkout';

describe('Checkout', () => {
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
    const fixture = TestBed.createComponent(Checkout);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const payButton = () => el.querySelector<HTMLButtonElement>('.pay-bar button')!;
    return { fixture, el, store, navigate, payButton };
  }

  it('applies FIRST20 to the service price', async () => {
    const { el, payButton } = await setup();
    const text = el.textContent ?? '';
    expect(text).toContain('AC General Service');
    expect(text).toContain('FIRST20 applied');
    expect(payButton().textContent).toContain('Pay ₹799');
  });

  it('charges the full price once the coupon is removed', async () => {
    const { fixture, el, payButton } = await setup();
    Array.from(el.querySelectorAll('button'))
      .find((b) => b.textContent?.includes('Remove'))!
      .click();
    await fixture.whenStable();

    expect(el.textContent).not.toContain('Coupon discount');
    expect(payButton().textContent).toContain('Pay ₹999');
  });

  it('confirms the booking with the discounted total and opens the success screen', async () => {
    const { store, navigate, payButton } = await setup();
    payButton().click();

    const booking = store.confirmed();
    expect(booking?.total).toBe(799);
    expect(navigate).toHaveBeenCalledWith(['/bookings', booking!.id]);
  });

  it('says "Confirm booking" when paying after the service', async () => {
    const { fixture, el, payButton } = await setup();
    const later = Array.from(el.querySelectorAll<HTMLInputElement>('input[name="payment"]'))[2];
    later.click();
    await fixture.whenStable();

    expect(payButton().textContent).toContain('Confirm booking');
  });
});
