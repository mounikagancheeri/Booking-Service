import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

import { Provider } from '../../../../shared/models';
import { Avatar } from '../../../../shared/ui/avatar/avatar';
import { Badge } from '../../../../shared/ui/badge/badge';
import { Button } from '../../../../shared/ui/button/button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { Rating } from '../../../../shared/ui/rating/rating';

let nextId = 0;

/**
 * Detailed result card from Stitch "2. AC Repair Results". The selected card expands with
 * pre-priced packages and View Profile / Book Now; others offer "Select Specialist".
 */
@Component({
  selector: 'app-specialist-card',
  imports: [Avatar, Badge, Button, CurrencyPipe, Icon, Rating],
  templateUrl: './specialist-card.html',
  styleUrl: './specialist-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialistCard {
  readonly provider = input.required<Provider>();
  readonly selected = input(false, { transform: booleanAttribute });
  readonly fastest = input(false, { transform: booleanAttribute });

  readonly pick = output<string>();
  readonly viewProfile = output<string>();
  readonly book = output<string>();

  protected readonly headingId = `specialist-${nextId++}`;
}
