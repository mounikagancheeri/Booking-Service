import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Review } from '../../../../shared/models';
import { Avatar } from '../../../../shared/ui/avatar/avatar';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-review-card',
  imports: [Avatar, Icon],
  template: `
    @let r = review();
    <article>
      <header>
        <app-avatar [name]="r.author" [size]="40" />
        <div class="who">
          <p class="author">{{ r.author }}</p>
          <p class="meta">{{ r.area }} • {{ r.when }}</p>
        </div>
        <span class="stars" role="img" [attr.aria-label]="'Rated ' + r.rating + ' out of 5'">
          @for (filled of stars(); track $index) {
            <app-icon name="star" [size]="16" [filled]="filled" />
          }
        </span>
      </header>
      <blockquote>“{{ r.text }}”</blockquote>
      <p class="service">{{ r.service }}</p>
    </article>
  `,
  styleUrl: './review-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCard {
  readonly review = input.required<Review>();

  protected readonly stars = computed(() =>
    Array.from({ length: 5 }, (_, i) => i < Math.round(this.review().rating)),
  );
}
