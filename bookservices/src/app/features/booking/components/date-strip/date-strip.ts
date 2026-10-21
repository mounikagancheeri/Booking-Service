import { ChangeDetectionStrategy, Component, booleanAttribute, input, model } from '@angular/core';

import { BookingDay } from '../../booking.models';

let nextId = 0;

/** Date chooser: a scrolling row of day chips, or a wrapping grid when `expanded`. */
@Component({
  selector: 'app-date-strip',
  templateUrl: './date-strip.html',
  styleUrl: './date-strip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateStrip {
  readonly days = input.required<BookingDay[]>();
  /** Selected day as `YYYY-MM-DD`. */
  readonly selected = model<string | null>(null);
  readonly expanded = input(false, { transform: booleanAttribute });
  readonly label = input('Select date');

  protected readonly name = `booking-date-${nextId++}`;
}
