import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BookingStep } from '../../booking.models';

@Component({
  selector: 'app-booking-stepper',
  template: `
    <ol [attr.aria-label]="label()">
      @for (step of steps(); track step.label; let i = $index) {
        <li
          [class.done]="i < current()"
          [class.current]="i === current()"
          [attr.aria-current]="i === current() ? 'step' : null"
        >
          <span class="bar" aria-hidden="true"></span>
          <span class="name">
            {{ i + 1 }}. {{ step.label }}
            @if (i < current()) {
              <span aria-hidden="true">✓</span>
              <span class="visually-hidden">(completed)</span>
            }
          </span>
        </li>
      }
    </ol>
  `,
  styleUrl: './booking-stepper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingStepper {
  readonly steps = input.required<BookingStep[]>();
  /** Zero-based index of the active step. */
  readonly current = input(0);
  readonly label = input('Booking progress');
}
