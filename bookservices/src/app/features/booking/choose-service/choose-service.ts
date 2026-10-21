import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Callout } from '../../../shared/ui/callout/callout';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { SectionHeader } from '../../../shared/ui/section-header/section-header';
import { ServicePackageCard } from '../../../shared/ui/service-package-card/service-package-card';
import { BookingStore } from '../booking-store';
import { BookingProviderSummary } from '../components/booking-provider-summary/booking-provider-summary';
import { BookingStepper } from '../components/booking-stepper/booking-stepper';
import { BookingSummaryBar } from '../components/booking-summary-bar/booking-summary-bar';
import { BOOKING_STEPS } from '../data/booking.mock';

/** Step 1 of the booking flow (Stitch "4. Choose Service"). */
@Component({
  selector: 'app-choose-service',
  imports: [
    BookingProviderSummary,
    BookingStepper,
    BookingSummaryBar,
    Callout,
    PageHeader,
    RouterLink,
    SectionHeader,
    ServicePackageCard,
  ],
  templateUrl: './choose-service.html',
  styleUrl: './choose-service.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseService {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  protected readonly store = inject(BookingStore);

  /** Bound from the `:providerId` route parameter. */
  readonly providerId = input('rahul-sharma');

  protected readonly steps = BOOKING_STEPS;
  protected readonly firstName = computed(
    () => this.store.provider()?.name.split(' ')[0] ?? 'your professional',
  );

  constructor() {
    effect(() => this.store.startFor(this.providerId()));
  }

  protected goBack(): void {
    this.location.back();
  }

  protected proceed(): void {
    if (this.store.type()) {
      this.router.navigate(['/book', this.providerId()]);
    }
  }
}
