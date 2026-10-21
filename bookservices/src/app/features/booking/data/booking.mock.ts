import {
  AppointmentType,
  BookingDay,
  BookingStep,
  ContactDetails,
  SlotPeriod,
  SlotStatus,
} from '../booking.models';

// Mock data for the Appointment Booking screen, based on the Stitch screens
// "4. Choose Service" (packages) and "5. Date & Slot Selection" (dates and slots).

export const BOOKING_STEPS: BookingStep[] = [
  { label: 'Service' },
  { label: 'Date & Time' },
  { label: 'Details' },
  { label: 'Review' },
];

export const APPOINTMENT_TYPES: AppointmentType[] = [
  {
    id: 'ac-inspection',
    label: 'AC Inspection',
    icon: 'search_check',
    durationLabel: '30 mins',
    price: 499,
    description:
      'Basic diagnosis, inspection of coils, filter check, and comprehensive fault assessment.',
    perks: ['Digital report included', 'Zero call-out surcharge'],
  },
  {
    id: 'ac-general-service',
    label: 'AC General Service',
    icon: 'mode_fan',
    durationLabel: '60 mins',
    price: 999,
    popular: true,
    savings: 250,
    description:
      'Complete indoor/outdoor unit deep foam jet cleaning, dust removal, drain pipe unclogging, and gas pressure check.',
    perks: ['High-pressure jet wash', '30-day post-service warranty'],
  },
  {
    id: 'ac-repair',
    label: 'AC Repair',
    icon: 'build',
    durationLabel: 'Custom',
    price: 799,
    priceFrom: true,
    description:
      'Diagnosis and repair for cooling issues, water leakage, or electrical faults. Final parts estimate given on-site.',
    perks: ['OEM approved spare parts', 'Standard diagnostic fee'],
  },
];

export const MOCK_CONTACT: ContactDetails = {
  name: 'Priya Reddy',
  phone: '+91 98765 43210',
  address: 'Flat 304, Green Heights, Gachibowli, Hyderabad - 500032',
  area: 'Gachibowli',
};

export const MOCK_NOTES =
  'AC is running but not cooling properly. Slight humming sound from indoor unit.';

const PERIODS: Omit<SlotPeriod, 'slots'>[] = [
  { id: 'morning', label: 'Morning', icon: 'wb_twilight', range: '9 AM - 12 PM' },
  { id: 'afternoon', label: 'Afternoon', icon: 'light_mode', range: '12 PM - 5 PM' },
  { id: 'evening', label: 'Evening', icon: 'bedtime', range: '5 PM - 8 PM' },
];

const pad = (n: number) => String(n).padStart(2, '0');

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** "16:00" → "04:00 PM" */
export function formatTime(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  return `${pad(h % 12 || 12)}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
}

function toBookingDay(date: Date): BookingDay {
  const iso = toIsoDate(date);
  const month = date.toLocaleDateString('en-GB', { month: 'short' });
  return {
    iso,
    dayNumber: pad(date.getDate()),
    weekday: date.toLocaleDateString('en-GB', { weekday: 'short' }),
    month,
    monthYear: date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    longLabel: `${date.toLocaleDateString('en-GB', { weekday: 'long' })}, ${date.getDate()} ${month}`,
    isToday: iso === toIsoDate(new Date()),
  };
}

/** Labels for a single `YYYY-MM-DD` date. */
export function describeDay(iso: string): BookingDay {
  return toBookingDay(fromIsoDate(iso));
}

export function buildBookingDays(start: Date, count: number): BookingDay[] {
  return Array.from({ length: count }, (_, i) =>
    toBookingDay(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)),
  );
}

/**
 * Groups one day's API slots into Morning (before 12), Afternoon (12-5 PM) and Evening.
 * Unavailable slots are "booked"; slots earlier than `now` are "past". Empty periods are dropped.
 */
export function toSlotPeriods(
  iso: string,
  slots: { time: string; available: boolean }[],
  now: Date = new Date(),
): SlotPeriod[] {
  const date = fromIsoDate(iso);
  const periodOf = (hour: number): SlotPeriod['id'] =>
    hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

  const timeSlots = [...slots]
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((slot) => {
      const [h, m] = slot.time.split(':').map(Number);
      const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m);
      const status: SlotStatus = start <= now ? 'past' : slot.available ? 'available' : 'booked';
      return {
        period: periodOf(h),
        id: `${iso}T${slot.time}`,
        time: formatTime(slot.time),
        status,
      };
    });

  return PERIODS.map((period) => ({
    ...period,
    slots: timeSlots.filter((s) => s.period === period.id).map(({ period: _, ...s }) => s),
  })).filter((period) => period.slots.length > 0);
}
