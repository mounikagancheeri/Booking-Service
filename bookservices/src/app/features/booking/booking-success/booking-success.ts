import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Avatar } from '../../../shared/ui/avatar/avatar';
import { Badge } from '../../../shared/ui/badge/badge';
import { Button } from '../../../shared/ui/button/button';
import { Icon } from '../../../shared/ui/icon/icon';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { Rating } from '../../../shared/ui/rating/rating';
import { BookingStore } from '../booking-store';
import { RoadmapStep, ServiceRoadmap } from '../components/service-roadmap/service-roadmap';

/** Stitch "7. Booking Success". Guarded by `successGuard`, so `confirmed` is always set. */
@Component({
  selector: 'app-booking-success',
  imports: [Avatar, Badge, Button, CurrencyPipe, Icon, PageHeader, Rating, ServiceRoadmap],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSuccess {
  private readonly router = inject(Router);
  private readonly store = inject(BookingStore);

  /** Bound from the `:bookingId` route parameter. */
  readonly bookingId = input('');

  protected readonly booking = this.store.confirmed;
  protected readonly contact = this.store.contact;
  protected readonly provider = this.store.provider;
  protected readonly type = computed(() =>
    this.store.types().find((t) => t.id === this.booking()?.typeId),
  );
  protected readonly firstName = computed(() => this.provider()?.name.split(' ')[0] ?? '');
  protected readonly copied = signal(false);

  protected readonly roadmap = computed<RoadmapStep[]>(() => {
    const booking = this.booking();
    return [
      { title: 'Booking Confirmed', detail: 'Technician locked and assigned.', status: 'done' },
      {
        title: 'Technician Arrives',
        meta: booking?.when,
        detail: 'Standard ID & temperature verification check.',
        status: 'current',
      },
      {
        title: this.type()?.label ?? 'Service',
        detail: this.type()?.description ?? 'Work carried out as agreed.',
        status: 'upcoming',
      },
      {
        title: 'Sign-off & Payment',
        detail: 'Test run verification, digital receipt and payment.',
        status: 'upcoming',
      },
    ];
  });

  protected async copyId(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.bookingId());
      this.copied.set(true);
    } catch {
      // Clipboard can be blocked; the id stays visible to copy manually.
    }
  }

  protected goHome(): void {
    this.store.reset();
    this.router.navigate(['/']);
  }
}
