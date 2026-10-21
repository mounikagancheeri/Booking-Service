import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  linkedSignal,
} from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-avatar',
  imports: [Icon],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.rounded]': 'shape() === "rounded"',
    '[style.--avatar-size.px]': 'size()',
  },
})
export class Avatar {
  readonly name = input.required<string>();
  readonly src = input<string>();
  readonly size = input(48);
  readonly shape = input<'circle' | 'rounded'>('circle');
  readonly verified = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  /** Falls back to initials when the image fails; resets whenever `src` changes. */
  protected readonly imageFailed = linkedSignal({ source: this.src, computation: () => false });

  protected readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(''),
  );
}
