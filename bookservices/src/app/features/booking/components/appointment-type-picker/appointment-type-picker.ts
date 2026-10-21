import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { Badge } from '../../../../shared/ui/badge/badge';
import { Icon } from '../../../../shared/ui/icon/icon';
import { AppointmentType } from '../../booking.models';

let nextId = 0;

/** Single-choice list of service packages, built on native radios for keyboard support. */
@Component({
  selector: 'app-appointment-type-picker',
  imports: [Badge, CurrencyPipe, Icon],
  templateUrl: './appointment-type-picker.html',
  styleUrl: './appointment-type-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentTypePicker {
  readonly types = input.required<AppointmentType[]>();
  readonly selectedId = model<string | null>(null);
  readonly label = input('Appointment type');

  protected readonly name = `appointment-type-${nextId++}`;
}
