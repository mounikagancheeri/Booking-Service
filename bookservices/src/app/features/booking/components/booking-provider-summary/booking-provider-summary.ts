import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Provider } from '../../../../shared/models';
import { Avatar } from '../../../../shared/ui/avatar/avatar';
import { Badge } from '../../../../shared/ui/badge/badge';
import { Rating } from '../../../../shared/ui/rating/rating';
import { AppointmentType } from '../../booking.models';

/** Compact "who and what you're booking" card shown at the top of the booking flow. */
@Component({
  selector: 'app-booking-provider-summary',
  imports: [Avatar, Badge, CurrencyPipe, Rating],
  template: `
    @let p = provider();
    <div class="who">
      <app-avatar shape="rounded" [name]="p.name" [src]="p.avatarUrl" [size]="44" />
      <div class="text">
        <div class="name-row">
          <h2>{{ p.name }}</h2>
          @if (p.verified) {
            <app-badge variant="verified" icon="verified">Vetted Pro</app-badge>
          }
        </div>
        @if (type(); as t) {
          <p class="service">
            {{ t.label }} • {{ t.price | currency: 'INR' : 'symbol' : '1.0-0' }}
            <span class="duration">({{ t.durationLabel }})</span>
          </p>
        }
      </div>
    </div>
    <span class="rating">
      <app-rating [value]="p.rating" [count]="p.reviewCount" [showCount]="false" />
    </span>
  `,
  styleUrl: './booking-provider-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingProviderSummary {
  readonly provider = input.required<Provider>();
  readonly type = input<AppointmentType>();
}
