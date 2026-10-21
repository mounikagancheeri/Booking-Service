import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

import { Icon } from '../icon/icon';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md';

/** Styles a native `<button>` or `<a>` so it keeps its built-in semantics. */
@Component({
  selector: 'button[appButton], a[appButton]',
  imports: [Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.aria-busy]': 'loading() || null',
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly icon = input<string>();
  readonly iconPosition = input<'start' | 'end'>('start');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });

  protected readonly isDisabled = computed(() => this.disabled() || this.loading());
  protected readonly hostClass = computed(
    () =>
      `btn btn--${this.variant()} btn--${this.size()}` +
      (this.fullWidth() ? ' btn--full' : '') +
      (this.loading() ? ' btn--loading' : ''),
  );
}
