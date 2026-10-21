export interface AppointmentType {
  id: string;
  label: string;
  /** Material Symbols icon name. */
  icon: string;
  durationLabel: string;
  /** Price in INR. */
  price: number;
  popular?: boolean;
  /** Price is a starting estimate ("From ₹799") rather than fixed. */
  priceFrom?: boolean;
  description?: string;
  perks?: string[];
  savings?: number;
}

export interface ContactDetails {
  name: string;
  phone: string;
  address: string;
  area: string;
}

export interface ConfirmedBooking {
  id: string;
  providerId: string;
  typeId: string;
  slotId: string;
  /** e.g. "Friday, 9 Oct at 04:00 PM". */
  when: string;
  total: number;
}

export interface BookingDay {
  /** Local date as `YYYY-MM-DD`. */
  iso: string;
  dayNumber: string;
  weekday: string;
  month: string;
  /** e.g. "October 2026". */
  monthYear: string;
  /** e.g. "Friday, 9 Oct". */
  longLabel: string;
  isToday: boolean;
}

export type SlotStatus = 'available' | 'booked' | 'past';

export interface TimeSlot {
  /** `YYYY-MM-DDTHH:mm`, unique across days. */
  id: string;
  /** e.g. "04:00 PM". */
  time: string;
  status: SlotStatus;
}

export interface SlotPeriod {
  id: 'morning' | 'afternoon' | 'evening';
  label: string;
  icon: string;
  range: string;
  slots: TimeSlot[];
}

export interface BookingStep {
  label: string;
}
