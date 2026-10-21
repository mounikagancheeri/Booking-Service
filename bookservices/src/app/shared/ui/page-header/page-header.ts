import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Avatar } from '../avatar/avatar';
import { Icon } from '../icon/icon';

/** Top bar for flow screens: back button, page title and the signed-in user. */
@Component({
  selector: 'app-page-header',
  imports: [Avatar, Icon],
  template: `
    <header class="bar">
      <div class="start">
        <button type="button" class="back" [attr.aria-label]="backLabel()" (click)="back.emit()">
          <app-icon name="chevron_left" [size]="24" />
        </button>
        <h1>{{ heading() }}</h1>
      </div>
      @if (userName(); as name) {
        <app-avatar [name]="name" [src]="userAvatarUrl()" [size]="32" />
      }
    </header>
  `,
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  readonly heading = input.required<string>();
  readonly backLabel = input('Go back');
  readonly userName = input<string>();
  readonly userAvatarUrl = input<string>();

  readonly back = output<void>();
}
