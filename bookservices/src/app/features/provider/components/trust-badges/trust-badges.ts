import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TrustBadge } from '../../../../shared/models';
import { Icon } from '../../../../shared/ui/icon/icon';

/** Verification credentials row on the provider profile. */
@Component({
  selector: 'app-trust-badges',
  imports: [Icon],
  template: `
    <ul [attr.aria-label]="label()">
      @for (badge of badges(); track badge.label) {
        <li>
          <app-icon [name]="badge.icon" [size]="18" filled />
          {{ badge.label }}
        </li>
      }
    </ul>
  `,
  styleUrl: './trust-badges.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustBadges {
  readonly badges = input.required<TrustBadge[]>();
  readonly label = input('Verifications');
}
