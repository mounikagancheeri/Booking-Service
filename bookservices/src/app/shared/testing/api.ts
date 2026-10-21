import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { toIsoDate } from '../../features/booking/data/booking.mock';

// Spec-only helpers: API payloads matching the backend's mock repositories.

const API = 'http://localhost:3000/api';

export const API_RAHUL = {
  id: 1,
  name: 'Rahul Sharma',
  specialization: 'AC Technician',
  categoryId: 1,
  rating: 4.9,
  reviews: 124,
  experience: 7,
  priceFrom: 499,
  verified: true,
  location: 'Gachibowli, Hyderabad',
  nextAvailable: '2026-10-10T16:00:00',
};

export const API_RAHUL_SERVICES = [
  {
    id: 1,
    providerId: 1,
    name: 'AC Inspection',
    price: 499,
    durationMinutes: 30,
    description: 'Basic inspection and diagnosis',
  },
  {
    id: 2,
    providerId: 1,
    name: 'AC General Service',
    price: 999,
    durationMinutes: 60,
    description: 'Complete cleaning and maintenance',
  },
  {
    id: 3,
    providerId: 1,
    name: 'AC Repair',
    price: 799,
    durationMinutes: 90,
    description: 'Repair based on diagnosis',
  },
];

/** A day of slots: 09:00, 10:30, 13:00 and 16:00 are free, 20:00 is taken. */
export function apiSlots(date: string, providerId = 1) {
  return [
    { time: '09:00', available: true },
    { time: '10:30', available: true },
    { time: '13:00', available: true },
    { time: '16:00', available: true },
    { time: '20:00', available: false },
  ].map((slot, i) => ({ id: i + 1, providerId, date, ...slot }));
}

const NOT_FOUND = { status: 404, statusText: 'Not Found' };
const NOT_FOUND_BODY = { success: false, message: 'Provider not found' };

/**
 * Answers the `BookingStore` requests for one provider: its details, its services and
 * today's slots (the date `startFor` picks). Pass `found: false` to answer all with a 404.
 */
export function flushProvider(
  id = '1',
  { found = true, provider = API_RAHUL, services = API_RAHUL_SERVICES } = {},
): void {
  TestBed.tick();
  const http = TestBed.inject(HttpTestingController);
  const detail = http.expectOne(`${API}/providers/${id}`);
  const list = http.expectOne(`${API}/providers/${id}/services`);
  if (found) {
    detail.flush({ success: true, data: provider });
    list.flush({ success: true, data: services });
  } else {
    detail.flush(NOT_FOUND_BODY, NOT_FOUND);
    list.flush(NOT_FOUND_BODY, NOT_FOUND);
  }
  flushSlots(id, toIsoDate(new Date()), found ? undefined : null);
}

/** Answers the slots request for `date`; `null` answers with a 404. */
export function flushSlots(
  id: string,
  date: string,
  slots: unknown[] | null = apiSlots(date, Number(id)),
): void {
  TestBed.tick();
  const req = TestBed.inject(HttpTestingController).expectOne(
    (r) => r.url === `${API}/providers/${id}/slots` && r.params.get('date') === date,
  );
  if (slots) {
    req.flush({ success: true, data: slots });
  } else {
    req.flush(NOT_FOUND_BODY, NOT_FOUND);
  }
  TestBed.tick();
}
