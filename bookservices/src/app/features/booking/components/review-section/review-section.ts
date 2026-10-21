import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../shared/ui/button/button';

let nextId = 0;

/** Titled card on the Review step, with an optional Edit link back to the step that owns it. */
@Component({
  selector: 'app-review-section',
  imports: [Button, RouterLink],
  template: `
    <section [attr.aria-labelledby]="headingId">
      <header>
        <h3 [id]="headingId">{{ heading() }}</h3>
        @if (editLink(); as link) {
          <a
            appButton
            variant="ghost"
            size="sm"
            icon="edit"
            [routerLink]="link"
            [attr.aria-label]="'Edit ' + heading()"
          >
            Edit
          </a>
        }
      </header>
      <ng-content />
    </section>
  `,
  styleUrl: './review-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewSection {
  readonly heading = input.required<string>();
  readonly editLink = input<string | readonly unknown[]>();

  protected readonly headingId = `review-section-${nextId++}`;
}
