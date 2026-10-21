import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

import { Provider } from '../../models';
import { Avatar } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Rating } from '../rating/rating';

let nextId = 0;

/**
 * Provider summary. `featured` is the spotlight card with trust strip and two actions;
 * `compact` is the list row with a single Reserve action.
 */
@Component({
  selector: 'app-provider-card',
  imports: [Avatar, Badge, Button, CurrencyPipe, Icon, Rating],
  templateUrl: './provider-card.html',
  styleUrl: './provider-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderCard {
  readonly provider = input<Provider>();
  readonly variant = input<'featured' | 'compact'>('compact');
  readonly selected = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly book = output<string>();
  readonly viewProfile = output<string>();

  protected readonly headingId = `provider-card-${nextId++}`;
}
