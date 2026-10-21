import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Icon } from '../icon/icon';

/** Section title row. Project a badge (e.g. `<app-badge>`) to show it on the right. */
@Component({
  selector: 'app-section-header',
  imports: [Icon],
  template: `
    <div class="text">
      @if (eyebrow(); as text) {
        <span class="eyebrow">{{ text }}</span>
      }
      <h2 [attr.id]="headingId() ?? null">{{ heading() }}</h2>
      @if (subtitle(); as text) {
        <p>{{ text }}</p>
      }
    </div>
    <div class="aside">
      <ng-content />
      @if (actionLabel(); as text) {
        <button
          type="button"
          class="action"
          [attr.aria-expanded]="actionExpanded() ?? null"
          (click)="action.emit()"
        >
          {{ text }}
          @if (actionIcon(); as name) {
            <app-icon [name]="name" [size]="18" />
          }
        </button>
      }
    </div>
  `,
  styleUrl: './section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  readonly heading = input.required<string>();
  readonly subtitle = input<string>();
  /** Small uppercase label shown above the heading. */
  readonly eyebrow = input<string>();
  /** Lets a parent `<section>` reference the heading via `aria-labelledby`. */
  readonly headingId = input<string>();
  readonly actionLabel = input<string>();
  readonly actionIcon = input<string>();
  /** Set when the action toggles something, to expose `aria-expanded`. */
  readonly actionExpanded = input<boolean>();

  readonly action = output<void>();
}
