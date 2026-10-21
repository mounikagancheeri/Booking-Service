import { CurrencyPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Avatar } from '../../../shared/ui/avatar/avatar';
import { Badge } from '../../../shared/ui/badge/badge';
import { Button } from '../../../shared/ui/button/button';
import { Callout } from '../../../shared/ui/callout/callout';
import { Icon } from '../../../shared/ui/icon/icon';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { Rating } from '../../../shared/ui/rating/rating';
import { BookingStore } from '../booking-store';
import { BookingStepper } from '../components/booking-stepper/booking-stepper';
import { PriceBreakdown, PriceLine } from '../components/price-breakdown/price-breakdown';
import { ReviewSection } from '../components/review-section/review-section';
import { BOOKING_STEPS } from '../data/booking.mock';

/** Step 4 of the booking flow (Stitch "6. Review and Confirm"). Guarded by `reviewGuard`. */
@Component({
  selector: 'app-review',
  imports: [
    Avatar,
    Badge,
    BookingStepper,
    Button,
    Callout,
    CurrencyPipe,
    Icon,
    PageHeader,
    PriceBreakdown,
    Rating,
    ReviewSection,
    RouterLink,
  ],
  templateUrl: './review.html',
  styleUrl: './review.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Review {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  protected readonly store = inject(BookingStore);

  /** Bound from the `:providerId` route parameter. */
  readonly providerId = input('rahul-sharma');

  protected readonly steps = BOOKING_STEPS;
  protected readonly priceLines = computed<PriceLine[]>(() => {
    const type = this.store.type();
    return [
      ...(type ? [{ label: type.label, amount: type.price }] : []),
      { label: 'Platform & Booking Fee', amount: 49, waived: true, note: 'Free' },
      { label: 'Taxes & Surcharges', note: 'Included' },
    ];
  });

  protected goBack(): void {
    this.location.back();
  }

  protected continueToPayment(): void {
    this.router.navigate(['/book', this.providerId(), 'checkout']);
  }
}
