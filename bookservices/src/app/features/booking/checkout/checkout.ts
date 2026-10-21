import { CurrencyPipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '../../../shared/ui/button/button';
import { Icon } from '../../../shared/ui/icon/icon';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { SessionStore } from '../../account/session-store';
import { BookingStore } from '../booking-store';

type PaymentMethod = 'upi' | 'card' | 'later';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  detail?: string;
  /** Material Symbols icon name; UPI shows a text mark instead. */
  icon?: string;
}

const COUPON = { code: 'FIRST20', percent: 20 };

/** Payment step after Review (BookIt "09 Checkout"). Guarded by `reviewGuard`. */
@Component({
  selector: 'app-checkout',
  imports: [Button, CurrencyPipe, Icon, PageHeader],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  protected readonly store = inject(BookingStore);
  protected readonly session = inject(SessionStore);

  /** Bound from the `:providerId` route parameter. */
  readonly providerId = input('');

  protected readonly coupon = COUPON;
  protected readonly options: PaymentOption[] = [
    { id: 'upi', label: 'UPI', detail: 'priya.reddy@okaxis' },
    { id: 'card', label: 'Card', detail: 'Visa ending 4021', icon: 'credit_card' },
    { id: 'later', label: 'Pay after service', icon: 'payments' },
  ];

  protected readonly couponApplied = signal(true);
  protected readonly method = signal<PaymentMethod>('upi');

  protected readonly itemTotal = this.store.total;
  protected readonly discount = computed(() =>
    this.couponApplied() ? Math.round((this.itemTotal() * COUPON.percent) / 100) : 0,
  );
  protected readonly toPay = computed(() => this.itemTotal() - this.discount());

  protected pay(): void {
    const id = this.store.confirm(this.toPay());
    if (id) {
      this.router.navigate(['/bookings', id]);
    }
  }

  protected goBack(): void {
    this.location.back();
  }
}
