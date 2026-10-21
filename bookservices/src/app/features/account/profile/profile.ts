import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Avatar } from '../../../shared/ui/avatar/avatar';
import { BottomNav } from '../../../shared/ui/bottom-nav/bottom-nav';
import { Icon } from '../../../shared/ui/icon/icon';
import { NAV_ITEMS } from '../../../shared/ui/fixtures';
import { buildMockBookings } from '../data/account.mock';
import { SessionStore } from '../session-store';

interface AccountLink {
  label: string;
  icon: string;
  /** Omitted for sections that are not built yet. */
  route?: string;
}

/** "Profile" tab (BookIt "13 Profile"). */
@Component({
  selector: 'app-profile',
  imports: [Avatar, BottomNav, Icon, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly router = inject(Router);
  protected readonly session = inject(SessionStore);

  protected readonly navItems = NAV_ITEMS;
  protected readonly stats = [
    { label: 'Bookings', value: String(buildMockBookings().length) },
    { label: 'Wallet', value: '₹250' },
    { label: 'Saved', value: '₹1,840', highlight: true },
  ];
  protected readonly links: AccountLink[] = [
    { label: 'Saved addresses', icon: 'location_on', route: '/location' },
    { label: 'Payment methods', icon: 'credit_card' },
    { label: 'Favourite pros', icon: 'favorite', route: '/providers' },
    { label: 'Help & support', icon: 'support_agent' },
  ];
  protected readonly inviteStatus = signal<string | null>(null);

  protected async invite(): Promise<void> {
    const data = {
      title: 'SkillConnect',
      text: 'Get ₹200 off your first home service booking on SkillConnect.',
      url: location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(`${data.text} ${data.url}`);
        this.inviteStatus.set('Invite link copied');
      }
    } catch {
      // The share sheet was dismissed or the clipboard is blocked; nothing to report.
    }
  }

  protected logOut(): void {
    this.session.signOut();
    this.router.navigate(['/welcome']);
  }
}
