import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BottomNav } from '../../../shared/ui/bottom-nav/bottom-nav';
import { Icon } from '../../../shared/ui/icon/icon';
import { NAV_ITEMS } from '../../../shared/ui/fixtures';
import { BookingStore } from '../../booking/booking-store';
import { describeDay, formatTime, toIsoDate } from '../../booking/data/booking.mock';
import { BookingItem, BookingStatus, buildMockBookings } from '../data/account.mock';

const STATUS_LABEL: Record<BookingStatus, string> = {
  confirmed: 'Confirmed',
  assigned: 'Pro assigned',
  completed: 'Completed',
};

/** "My bookings" tab (BookIt "11 Bookings"). */
@Component({
  selector: 'app-bookings',
  imports: [BottomNav, CurrencyPipe, Icon, RouterLink],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bookings {
  private readonly store = inject(BookingStore);

  protected readonly navItems = NAV_ITEMS;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly tab = signal<'upcoming' | 'past'>('upcoming');

  private readonly now = new Date();
  /** The booking just made in this session, if any, plus the mock history. */
  private readonly all = computed(() => {
    const items = buildMockBookings(this.now);
    const just = this.store.confirmed();
    if (just) {
      const provider = this.store.provider();
      items.unshift({
        id: just.id,
        status: 'confirmed',
        service: this.store.types().find((t) => t.id === just.typeId)?.label ?? 'Service',
        icon: 'home_repair_service',
        providerId: just.providerId,
        providerName: provider?.id === just.providerId ? provider.name : 'Your professional',
        detail: 'Booked just now',
        price: just.total,
        start: just.slotId,
        area: provider?.area?.split(',')[0] ?? '',
      });
    }
    return items;
  });
  protected readonly upcoming = computed(() => this.all().filter((b) => b.status !== 'completed'));
  protected readonly past = computed(() => this.all().filter((b) => b.status === 'completed'));

  /** "Thu, 22 Oct · 10:00 AM" */
  protected when(booking: BookingItem): string {
    const [date, time] = booking.start.split('T');
    const day = describeDay(date);
    return `${day.weekday}, ${+day.dayNumber} ${day.month} · ${formatTime(time)}`;
  }

  /** "Today", "Tomorrow" or "In 3 days". */
  protected relative(booking: BookingItem): string {
    const today = new Date(toIsoDate(this.now)).getTime();
    const days = Math.round((new Date(booking.start.split('T')[0]).getTime() - today) / 86_400_000);
    return days <= 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`;
  }
}
