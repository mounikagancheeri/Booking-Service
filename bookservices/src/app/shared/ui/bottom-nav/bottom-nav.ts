import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavItem } from '../../models';
import { Icon } from '../icon/icon';

/** App tab bar, fixed to the bottom of the screen at every width. */
@Component({
  selector: 'app-bottom-nav',
  imports: [Icon, RouterLink],
  template: `
    <nav [attr.aria-label]="label()">
      <ul>
        @for (item of items(); track item.id) {
          @let active = item.id === activeId();
          <li>
            <a
              [routerLink]="item.route"
              [class.active]="active"
              [attr.aria-current]="active ? 'page' : null"
              (click)="activeId.set(item.id)"
            >
              <app-icon [name]="item.icon" [size]="24" [filled]="active" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './bottom-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNav {
  readonly items = input.required<NavItem[]>();
  readonly activeId = model<string>();
  readonly label = input('Main');
}
