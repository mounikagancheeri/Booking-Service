import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { Avatar } from '../../../shared/ui/avatar/avatar';
import { BottomNav } from '../../../shared/ui/bottom-nav/bottom-nav';
import { Icon } from '../../../shared/ui/icon/icon';
import { NAV_ITEMS } from '../../../shared/ui/fixtures';
import { CONVERSATIONS } from '../data/account.mock';

/** "Messages" tab (BookIt "12 Messages"). There is no chat API yet, so threads are mock. */
@Component({
  selector: 'app-messages',
  imports: [Avatar, BottomNav, Icon],
  templateUrl: './messages.html',
  styleUrl: './messages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Messages {
  protected readonly navItems = NAV_ITEMS;
  protected readonly query = signal('');
  protected readonly conversations = computed(() => {
    const q = this.query().trim().toLowerCase();
    return CONVERSATIONS.filter(
      (c) => !q || `${c.name} ${c.context ?? ''} ${c.preview}`.toLowerCase().includes(q),
    );
  });
}
