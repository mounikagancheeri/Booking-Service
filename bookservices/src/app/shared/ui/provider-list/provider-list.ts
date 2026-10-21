import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

import { Provider } from '../../models';
import { Icon } from '../icon/icon';
import { ProviderCard } from '../provider-card/provider-card';

@Component({
  selector: 'app-provider-list',
  imports: [Icon, ProviderCard],
  template: `
    @if (loading()) {
      <div class="list" role="status" aria-label="Loading providers">
        @for (n of placeholders; track n) {
          <app-provider-card loading />
        }
      </div>
    } @else if (providers().length === 0) {
      <p class="empty">
        <app-icon name="person_search" [size]="24" />
        {{ emptyText() }}
      </p>
    } @else {
      <ul class="list">
        @for (provider of providers(); track provider.id) {
          <li>
            <app-provider-card
              [provider]="provider"
              [selected]="provider.id === selectedId()"
              (book)="book.emit($event)"
              (viewProfile)="viewProfile.emit($event)"
            />
          </li>
        }
      </ul>
    }
  `,
  styleUrl: './provider-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderList {
  readonly providers = input<Provider[]>([]);
  readonly selectedId = input<string | null>(null);
  readonly loading = input(false, { transform: booleanAttribute });
  readonly emptyText = input('No professionals are available nearby right now.');

  readonly book = output<string>();
  readonly viewProfile = output<string>();

  protected readonly placeholders = [1, 2, 3];
}
