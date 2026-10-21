import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

import { Badge } from '../badge/badge';
import { Icon } from '../icon/icon';

/**
 * One selectable service package, rendered as a native radio option. Place several inside a
 * `<fieldset>` with the same `name` so they form a single radio group.
 */
@Component({
  selector: 'app-service-package-card',
  imports: [Badge, CurrencyPipe, Icon],
  templateUrl: './service-package-card.html',
  styleUrl: './service-package-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicePackageCard {
  readonly name = input.required<string>();
  readonly value = input.required<string>();
  readonly heading = input.required<string>();
  readonly icon = input('home_repair_service');
  readonly duration = input<string>();
  readonly price = input.required<number>();
  /** Show the price as a starting estimate ("From ₹799"). */
  readonly priceFrom = input(false, { transform: booleanAttribute });
  readonly description = input<string>();
  readonly perks = input<string[]>([]);
  readonly savings = input<number>();
  readonly popular = input(false, { transform: booleanAttribute });
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly picked = output<string>();
}
