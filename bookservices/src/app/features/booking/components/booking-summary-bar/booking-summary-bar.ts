import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

import { Badge } from '../../../../shared/ui/badge/badge';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';

/** Sticky bottom bar with the current selection and the step's primary action. */
@Component({
  selector: 'app-booking-summary-bar',
  imports: [Badge, Button, CurrencyPipe, Icon],
  templateUrl: './booking-summary-bar.html',
  styleUrl: './booking-summary-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSummaryBar {
  /** e.g. "Friday, 9 Oct at 04:00 PM"; empty while nothing is selected. */
  readonly summary = input<string | null>(null);
  /** Shown in place of `summary` while nothing is selected. */
  readonly placeholder = input('Pick an arrival time');
  readonly icon = input('schedule');
  readonly serviceLabel = input<string>();
  readonly price = input<number>();
  readonly held = input(false, { transform: booleanAttribute });
  readonly actionLabel = input('Continue to Booking Details');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly proceed = output<void>();
}
