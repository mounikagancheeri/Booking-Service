import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { Avatar } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-header',
  imports: [Avatar, Badge, Icon],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  readonly location = input.required<string>();
  readonly userName = input.required<string>();
  readonly userAvatarUrl = input<string>();
  readonly unreadCount = input(0);

  readonly changeLocation = output<void>();
  readonly openNotifications = output<void>();

  protected readonly notificationsLabel = computed(() =>
    this.unreadCount() > 0 ? `Notifications, ${this.unreadCount()} unread` : 'Notifications',
  );
}
