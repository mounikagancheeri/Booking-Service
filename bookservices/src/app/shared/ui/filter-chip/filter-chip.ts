import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

import { Icon } from '../icon/icon';

/**
 * Pill-shaped filter or sort control on a native `<button>`. Toggle chips expose
 * `aria-pressed`; set `toggle` to false for chips that open a menu or cycle a value.
 */
@Component({
  selector: 'button[appFilterChip]',
  imports: [Icon],
  template: `
    @if (icon(); as name) {
      <app-icon [name]="name" [size]="16" [filled]="selected()" />
    }
    <ng-content />
    @if (trailingIcon(); as name) {
      <app-icon [name]="name" [size]="16" />
    }
  `,
  styleUrl: './filter-chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    '[class.selected]': 'selected()',
    '[attr.aria-pressed]': 'toggle() ? selected() : null',
  },
})
export class FilterChip {
  readonly selected = input(false, { transform: booleanAttribute });
  readonly toggle = input(true, { transform: booleanAttribute });
  readonly icon = input<string>();
  readonly trailingIcon = input<string>();
}
