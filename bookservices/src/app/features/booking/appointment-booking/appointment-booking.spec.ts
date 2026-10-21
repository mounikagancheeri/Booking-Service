import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { flushProvider, flushSlots } from '../../../shared/testing/api';
import { buildBookingDays } from '../data/booking.mock';
import { AppointmentBooking } from './appointment-booking';

describe('AppointmentBooking', () => {
  // Tomorrow always has future slots, whatever time the tests run.
  const tomorrow = buildBookingDays(new Date(), 2)[1];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  async function setup() {
    const fixture = TestBed.createComponent(AppointmentBooking);
    fixture.componentRef.setInput('providerId', '1');
    fixture.detectChanges();
    flushProvider('1');
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const page = fixture.componentInstance;

    const pickTomorrow = async () => {
      el.querySelector<HTMLInputElement>(`input[value="${tomorrow.iso}"]`)!.click();
      flushSlots('1', tomorrow.iso);
      await fixture.whenStable();
    };
    const slotInputs = () =>
      Array.from(el.querySelectorAll<HTMLInputElement>('input[name="arrival-slot"]'));
    const cta = () =>
      el.querySelector<HTMLButtonElement>('app-booking-summary-bar button[appButton]')!;

    return { fixture, el, page, pickTomorrow, slotInputs, cta };
  }

  it("offers the provider's services with none picked, and today", async () => {
    const { el, page } = await setup();
    expect(page.selectedTypeId()).toBeNull();
    expect(el.textContent).toContain('AC General Service');
    expect(page.selectedDate()).toBe(buildBookingDays(new Date(), 1)[0].iso);
  });

  it('updates the provider summary when the appointment type changes', async () => {
    const { fixture, el, page } = await setup();
    el.querySelector<HTMLInputElement>('input[value="1"]')!.click();
    await fixture.whenStable();

    expect(page.selectedTypeId()).toBe('1');
    expect(el.querySelector('app-booking-provider-summary')!.textContent).toContain(
      'AC Inspection',
    );
  });

  it('keeps the CTA disabled until a slot is chosen, then shows the summary', async () => {
    const { fixture, page, pickTomorrow, slotInputs, cta } = await setup();
    await pickTomorrow();
    expect(cta().disabled).toBe(true);

    const slot = slotInputs().find((input) => !input.disabled)!;
    slot.click();
    await fixture.whenStable();

    expect(page.selectedSlotId()).toBe(slot.value);
    expect(cta().disabled).toBe(false);
    expect(fixture.nativeElement.querySelector('.when-text').textContent).toContain(
      `${tomorrow.longLabel} at`,
    );
  });

  it('clears the slot when the date changes', async () => {
    const { fixture, el, page, pickTomorrow, slotInputs } = await setup();
    await pickTomorrow();
    slotInputs()
      .find((input) => !input.disabled)!
      .click();
    await fixture.whenStable();
    expect(page.selectedSlotId()).not.toBeNull();

    const dayAfter = buildBookingDays(new Date(), 3)[2];
    el.querySelector<HTMLInputElement>(`input[value="${dayAfter.iso}"]`)!.click();
    flushSlots('1', dayAfter.iso);
    await fixture.whenStable();

    expect(page.selectedDate()).toBe(dayAfter.iso);
    expect(page.selectedSlotId()).toBeNull();
  });

  it('continues to the review step once a slot is chosen', async () => {
    const { fixture, pickTomorrow, slotInputs, cta } = await setup();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await pickTomorrow();
    slotInputs()
      .find((input) => !input.disabled)!
      .click();
    await fixture.whenStable();

    cta().click();
    expect(navigate).toHaveBeenCalledWith(['/book', '1', 'review']);
  });

  it('disables booked slots', async () => {
    const { pickTomorrow, slotInputs } = await setup();
    await pickTomorrow();
    const eightPm = slotInputs().find((input) => input.value.endsWith('T20:00'))!;
    expect(eightPm.disabled).toBe(true);
  });

  it('shows a not-found message for an unknown provider', async () => {
    const fixture = TestBed.createComponent(AppointmentBooking);
    fixture.componentRef.setInput('providerId', '99');
    fixture.detectChanges();
    flushProvider('99', { found: false });
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain("couldn't find this professional");
    expect(el.querySelector('app-booking-summary-bar')).toBeNull();
  });
});
