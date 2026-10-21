import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_RAHUL, flushProvider, flushSlots } from '../../shared/testing/api';
import { BookingStore } from './booking-store';
import { buildBookingDays } from './data/booking.mock';

describe('BookingStore', () => {
  const [, tomorrow, dayAfter] = buildBookingDays(new Date(), 3);

  function setup(): BookingStore {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    const store = TestBed.inject(BookingStore);
    store.startFor('1');
    flushProvider('1');
    return store;
  }

  function pickTomorrow(store: BookingStore): void {
    store.typeId.set('2');
    store.date.set(tomorrow.iso);
    flushSlots('1', tomorrow.iso);
    store.slotId.set(`${tomorrow.iso}T13:00`);
  }

  it('loads the provider and their services from the API', () => {
    const store = setup();
    expect(store.provider()?.name).toBe('Rahul Sharma');
    expect(store.types().map((t) => t.label)).toEqual([
      'AC Inspection',
      'AC General Service',
      'AC Repair',
    ]);
    expect(store.types()[0]).toMatchObject({ id: '1', price: 499, durationLabel: '30 mins' });
    expect(store.typeId()).toBeNull();
  });

  it('derives the type, slot and summary', () => {
    const store = setup();
    pickTomorrow(store);
    expect(store.type()?.label).toBe('AC General Service');
    expect(store.slot()?.time).toBe('01:00 PM');
    expect(store.summary()).toBe(`${tomorrow.longLabel} at 01:00 PM`);
    expect(store.total()).toBe(999);
  });

  it('clears the slot when the date changes', () => {
    const store = setup();
    pickTomorrow(store);
    store.date.set(dayAfter.iso);
    expect(store.slotId()).toBeNull();
    expect(store.summary()).toBeNull();
  });

  it('keeps selections for the same provider and resets for a new one', () => {
    const store = setup();
    pickTomorrow(store);
    store.typeId.set('3');

    store.startFor('1');
    expect(store.typeId()).toBe('3');

    store.startFor('2');
    expect(store.typeId()).toBeNull();
    expect(store.slotId()).toBeNull();
    flushProvider('2', {
      provider: { ...API_RAHUL, id: 2, name: 'Arjun Reddy' },
      services: [
        {
          id: 4,
          providerId: 2,
          name: 'AC Inspection',
          price: 399,
          durationMinutes: 30,
          description: 'Inspection and diagnosis',
        },
      ],
    });
    expect(store.provider()?.name).toBe('Arjun Reddy');
    expect(store.types().map((t) => t.price)).toEqual([399]);
  });

  it('reports an unknown provider as null with no services', () => {
    const store = setup();
    store.startFor('99');
    flushProvider('99', { found: false });
    expect(store.provider()).toBeNull();
    expect(store.types()).toEqual([]);
  });

  it('confirms only a complete booking', () => {
    const store = setup();
    expect(store.confirm()).toBeNull();

    pickTomorrow(store);
    const id = store.confirm();
    expect(id).toMatch(/^SC-\d{6}$/);
    expect(store.confirmed()).toMatchObject({ id, providerId: '1', typeId: '2', total: 999 });
  });

  it("groups the provider's slots for the date into periods", () => {
    const store = setup();
    store.date.set(tomorrow.iso);
    TestBed.tick();
    expect(store.slotsLoading()).toBe(true);
    flushSlots('1', tomorrow.iso);

    expect(store.slotsLoading()).toBe(false);
    expect(store.periods().map((p) => [p.id, p.slots.map((s) => s.time)])).toEqual([
      ['morning', ['09:00 AM', '10:30 AM']],
      ['afternoon', ['01:00 PM', '04:00 PM']],
      ['evening', ['08:00 PM']],
    ]);
    expect(store.periods()[2].slots[0]).toMatchObject({
      id: `${tomorrow.iso}T20:00`,
      status: 'booked',
    });
  });

  it('shows no slots when the provider has none that day', () => {
    const store = setup();
    store.date.set(dayAfter.iso);
    flushSlots('1', dayAfter.iso, []);
    expect(store.periods()).toEqual([]);
  });
});
