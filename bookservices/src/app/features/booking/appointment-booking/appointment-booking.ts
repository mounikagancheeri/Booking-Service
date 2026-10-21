import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { Callout } from '../../../shared/ui/callout/callout';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { SectionHeader } from '../../../shared/ui/section-header/section-header';
import { BookingStore } from '../booking-store';
import { AppointmentTypePicker } from '../components/appointment-type-picker/appointment-type-picker';
import { BookingProviderSummary } from '../components/booking-provider-summary/booking-provider-summary';
import { BookingStepper } from '../components/booking-stepper/booking-stepper';
import { BookingSummaryBar } from '../components/booking-summary-bar/booking-summary-bar';
import { DateStrip } from '../components/date-strip/date-strip';
import { SlotGroup } from '../components/slot-group/slot-group';
import { BOOKING_STEPS, buildBookingDays } from '../data/booking.mock';

/** Step 2 of the booking flow: choose appointment type, date and arrival slot. */
@Component({
  selector: 'app-appointment-booking',
  imports: [
    AppointmentTypePicker,
    BookingProviderSummary,
    BookingStepper,
    BookingSummaryBar,
    Callout,
    DateStrip,
    PageHeader,
    SectionHeader,
    SlotGroup,
  ],
  templateUrl: './appointment-booking.html',
  styleUrl: './appointment-booking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentBooking {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly store = inject(BookingStore);

  /** Bound from the `:providerId` route parameter. */
  readonly providerId = input('rahul-sharma');

  protected readonly steps = BOOKING_STEPS;
  protected readonly types = this.store.types;
  private readonly allDays = buildBookingDays(new Date(), 14);

  readonly selectedTypeId = this.store.typeId;
  readonly selectedDate = this.store.date;
  readonly selectedSlotId = this.store.slotId;

  protected readonly showFullCalendar = signal(false);
  protected readonly days = computed(() =>
    this.allDays.slice(0, this.showFullCalendar() ? this.allDays.length : 7),
  );
  protected readonly provider = this.store.provider;
  protected readonly firstName = computed(() => this.provider()?.name.split(' ')[0] ?? '');
  protected readonly selectedType = this.store.type;
  protected readonly selectedDay = this.store.day;
  protected readonly periods = this.store.periods;
  protected readonly slotsLoading = this.store.slotsLoading;
  protected readonly selectedSlot = this.store.slot;
  protected readonly summary = this.store.summary;
  protected readonly availableCount = computed(
    () =>
      this.periods()
        .flatMap((p) => p.slots)
        .filter((s) => s.status === 'available').length,
  );
  protected readonly availableLabel = computed(() => {
    const count = this.availableCount();
    return `${count} open ${count === 1 ? 'slot' : 'slots'} on ${this.selectedDay().longLabel}`;
  });
  /** The bookable date after the selected one, offered when a day is fully booked. */
  protected readonly nextDay = computed(() => {
    const index = this.allDays.findIndex((d) => d.iso === this.selectedDay().iso);
    return index >= 0 ? this.allDays[index + 1] : undefined;
  });
  protected readonly demandHeading = computed(() => {
    const day = this.selectedDay();
    return day.isToday
      ? 'High demand today'
      : `High demand on ${day.weekday}, ${+day.dayNumber} ${day.month}`;
  });

  constructor() {
    effect(() => this.store.startFor(this.providerId()));
  }

  protected goBack(): void {
    this.location.back();
  }

  protected toggleFullCalendar(): void {
    this.showFullCalendar.update((open) => !open);
  }

  protected proceed(): void {
    if (this.selectedSlot()) {
      this.router.navigate(['/book', this.providerId(), 'review']);
    }
  }
}
