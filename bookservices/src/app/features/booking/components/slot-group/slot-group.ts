import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { Badge } from '../../../../shared/ui/badge/badge';
import { Icon } from '../../../../shared/ui/icon/icon';
import { SlotPeriod, SlotStatus } from '../../booking.models';

const STATUS_LABEL: Record<SlotStatus, string> = {
  available: 'Available',
  booked: 'Booked',
  past: 'Unavailable',
};

/**
 * One period (Morning / Afternoon / Evening) of arrival windows. Give every group on a page
 * the same `name` so they behave as a single radio group.
 */
@Component({
  selector: 'app-slot-group',
  imports: [Badge, Icon],
  templateUrl: './slot-group.html',
  styleUrl: './slot-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"period--" + period().id' },
})
export class SlotGroup {
  readonly period = input.required<SlotPeriod>();
  readonly name = input.required<string>();
  readonly selectedId = model<string | null>(null);

  protected readonly statusLabel = STATUS_LABEL;
}
