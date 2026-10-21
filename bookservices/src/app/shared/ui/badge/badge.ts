import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../icon/icon';

export type BadgeVariant = 'neutral' | 'primary' | 'verified' | 'accent';

@Component({
  selector: 'app-badge',
  imports: [Icon],
  template: `
    @if (icon(); as name) {
      <app-icon [name]="name" [size]="14" filled />
    }
    <ng-content />
  `,
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"badge--" + variant()' },
})
export class Badge {
  readonly variant = input<BadgeVariant>('neutral');
  readonly icon = input<string>();
}
