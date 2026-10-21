// Mock data for the account screens (Location, Bookings, Messages, Profile), based on the
// Claude Design canvas "BookIt". Professionals match the backend's mock providers.

export interface SavedAddress {
  id: string;
  label: string;
  /** Material Symbols icon name. */
  icon: string;
  line: string;
  area: string;
}

export type BookingStatus = 'confirmed' | 'assigned' | 'completed';

export interface BookingItem {
  id: string;
  status: BookingStatus;
  service: string;
  icon: string;
  providerId: string;
  providerName: string;
  /** e.g. "1 unit". */
  detail: string;
  /** Price in INR. */
  price: number;
  /** Local date-time as `YYYY-MM-DDTHH:mm`. */
  start: string;
  area: string;
}

export interface Conversation {
  id: string;
  name: string;
  /** e.g. "AC Service · Sat, 24 Oct"; omitted for support threads. */
  context?: string;
  preview: string;
  /** e.g. "6:42 PM" or "12 Oct". */
  time: string;
  unread: number;
  online: boolean;
  /** Shown instead of initials, e.g. for support. */
  icon?: string;
}

export const SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    line: 'Flat 304, Green Heights, Gachibowli',
    area: 'Hyderabad 500032',
  },
  {
    id: 'work',
    label: 'Work',
    icon: 'work',
    line: 'Mindspace IT Park, Madhapur',
    area: 'Hyderabad 500081',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Local `YYYY-MM-DDTHH:mm`, `days` from `now` at `time`. */
function at(now: Date, days: number, time: string): string {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${time}`;
}

/** Dates are relative to `now` so upcoming bookings stay upcoming. */
export function buildMockBookings(now: Date = new Date()): BookingItem[] {
  return [
    {
      id: 'SC-482130',
      status: 'confirmed',
      service: 'AC General Service',
      icon: 'mode_fan',
      providerId: '1',
      providerName: 'Rahul Sharma',
      detail: 'Split AC · 1 unit',
      price: 999,
      start: at(now, 2, '10:00'),
      area: 'Gachibowli',
    },
    {
      id: 'SC-481902',
      status: 'assigned',
      service: 'AC Inspection',
      icon: 'search_check',
      providerId: '2',
      providerName: 'Arjun Reddy',
      detail: 'Window AC · 1 unit',
      price: 499,
      start: at(now, 4, '16:00'),
      area: 'Madhapur',
    },
    {
      id: 'SC-479455',
      status: 'completed',
      service: 'Switchboard repair',
      icon: 'electrical_services',
      providerId: '3',
      providerName: 'Suresh Kumar',
      detail: '2 switches replaced',
      price: 349,
      start: at(now, -8, '11:00'),
      area: 'Kondapur',
    },
  ];
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'rahul',
    name: 'Rahul Sharma',
    context: 'AC General Service · upcoming',
    preview: 'I’ll reach by 10 AM, please keep the remote ready.',
    time: '6:42 PM',
    unread: 2,
    online: true,
  },
  {
    id: 'arjun',
    name: 'Arjun Reddy',
    context: 'AC Inspection · upcoming',
    preview: 'Namaste! I will bring the gas pressure gauge.',
    time: '5:10 PM',
    unread: 0,
    online: true,
  },
  {
    id: 'suresh',
    name: 'Suresh Kumar',
    context: 'Switchboard repair · Completed',
    preview: 'You: Thank you, working perfectly now.',
    time: '12 Oct',
    unread: 0,
    online: false,
  },
  {
    id: 'support',
    name: 'SkillConnect Support',
    preview: 'Your refund of ₹199 has been processed.',
    time: '9 Oct',
    unread: 0,
    online: false,
    icon: 'support_agent',
  },
];
