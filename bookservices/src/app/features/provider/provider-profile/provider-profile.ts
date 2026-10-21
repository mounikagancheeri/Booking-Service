import { CurrencyPipe, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

import { CategoryService } from '../../../shared/services/category';
import { Avatar } from '../../../shared/ui/avatar/avatar';
import { Badge } from '../../../shared/ui/badge/badge';
import { Button } from '../../../shared/ui/button/button';
import { Callout } from '../../../shared/ui/callout/callout';
import { Icon } from '../../../shared/ui/icon/icon';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { Rating } from '../../../shared/ui/rating/rating';
import { SectionHeader } from '../../../shared/ui/section-header/section-header';
import { ServicePackageCard } from '../../../shared/ui/service-package-card/service-package-card';
import { BookingStore } from '../../booking/booking-store';
import { BookingSummaryBar } from '../../booking/components/booking-summary-bar/booking-summary-bar';
import { ReviewCard } from '../components/review-card/review-card';
import { TrustBadges } from '../components/trust-badges/trust-badges';

/** Stitch "3. Provider Profile": credentials, packages and reviews for one professional. */
@Component({
  selector: 'app-provider-profile',
  imports: [
    Avatar,
    Badge,
    BookingSummaryBar,
    Button,
    Callout,
    CurrencyPipe,
    Icon,
    PageHeader,
    Rating,
    ReviewCard,
    RouterLink,
    SectionHeader,
    ServicePackageCard,
    TrustBadges,
  ],
  templateUrl: './provider-profile.html',
  styleUrl: './provider-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderProfile {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly categoryService = inject(CategoryService);
  protected readonly store = inject(BookingStore);

  /** Bound from the `:providerId` route parameter. */
  readonly providerId = input('rahul-sharma');

  protected readonly saved = signal(false);
  /** `undefined` while loading, `null` when the API has no such provider. */
  protected readonly provider = computed(() =>
    this.store.providerId() === this.providerId() ? this.store.provider() : undefined,
  );
  protected readonly firstName = computed(() => this.provider()?.name.split(' ')[0] ?? '');
  private readonly categories = toSignal(
    this.categoryService.getAllCategories().pipe(catchError(() => of([]))),
    { initialValue: [] },
  );
  protected readonly category = computed(() => {
    const id = this.provider()?.categoryIds?.[0];
    return this.categories().find((c) => c.id === id);
  });

  constructor() {
    effect(() => this.store.startFor(this.providerId()));
  }

  protected goBack(): void {
    this.location.back();
  }

  protected checkAvailability(): void {
    this.router.navigate(['/book', this.providerId()]);
  }
}
