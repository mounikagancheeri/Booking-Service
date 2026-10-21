import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-rating',
  imports: [Icon],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'img', '[attr.aria-label]': 'label()' },
})
export class Rating {
  readonly value = input.required<number>();
  readonly count = input(0);
  /** Shows "(98)" instead of "(98 reviews)". */
  readonly compact = input(false, { transform: booleanAttribute });
  /** Hide the visible review count (it stays in the accessible label). */
  readonly showCount = input(true, { transform: booleanAttribute });

  protected readonly label = computed(() =>
    this.count() > 0
      ? `Rated ${this.value()} out of 5 from ${this.count()} reviews`
      : 'New provider, no reviews yet',
  );
}
