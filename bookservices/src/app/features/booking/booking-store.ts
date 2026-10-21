import { Injectable, computed, inject, linkedSignal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';

import { Provider, ProviderOffering } from '../../shared/models';
import { ProviderService } from '../../shared/services/provider';
import { AppointmentType, ConfirmedBooking } from './booking.models';
import {
  MOCK_CONTACT,
  MOCK_NOTES,
  describeDay,
  toIsoDate,
  toSlotPeriods,
} from './data/booking.mock';

/** Selections for the in-progress booking, shared by every step of the flow. */
@Injectable({ providedIn: 'root' })
export class BookingStore {
  private readonly providerService = inject(ProviderService);

  readonly providerId = signal<string | null>(null);
  /** `undefined` while loading, `null` when there is no provider or the API has none. */
  readonly provider = toSignal(
    this.loadFor<Provider | null>((id) => this.providerService.getProviderById(id), null),
    { initialValue: undefined },
  );
  /** The provider's services; `undefined` while loading. */
  private readonly offerings = toSignal(
    this.loadFor<AppointmentType[]>(
      (id) =>
        this.providerService
          .getServicesByProviderId(id)
          .pipe(map((list) => list.map(toAppointmentType))),
      [],
    ),
    { initialValue: undefined },
  );
  readonly types = computed(() => this.offerings() ?? []);
  readonly typesLoading = computed(() => this.offerings() === undefined);
  /** Keeps the picked service while it is still offered; cleared when the list changes. */
  readonly typeId = linkedSignal<AppointmentType[], string | null>({
    source: this.types,
    computation: (list, previous) =>
      list.some((t) => t.id === previous?.value) ? previous!.value : null,
  });
  readonly date = signal<string | null>(toIsoDate(new Date()));
  /** Cleared whenever the date changes, since slots are per day. */
  readonly slotId = linkedSignal<string | null, string | null>({
    source: this.date,
    computation: () => null,
  });
  /** Step 3 has no Stitch design yet, so the saved profile details are used. */
  readonly contact = signal(MOCK_CONTACT);
  readonly notes = signal(MOCK_NOTES);
  readonly confirmed = signal<ConfirmedBooking | null>(null);

  readonly type = computed(() => this.types().find((t) => t.id === this.typeId()));
  readonly day = computed(() => describeDay(this.date() ?? toIsoDate(new Date())));
  /** The provider's slots for the selected date; `undefined` while loading. */
  private readonly daySlots = toSignal(
    toObservable(computed(() => ({ id: this.providerId(), iso: this.day().iso }))).pipe(
      switchMap(({ id, iso }) =>
        id
          ? this.providerService.getSlots(id, iso).pipe(
              map((slots) => toSlotPeriods(iso, slots)),
              catchError(() => of([])),
              startWith(undefined),
            )
          : of([]),
      ),
    ),
    { initialValue: undefined },
  );
  readonly periods = computed(() => this.daySlots() ?? []);
  readonly slotsLoading = computed(() => this.daySlots() === undefined);
  readonly slot = computed(
    () =>
      this.periods()
        .flatMap((p) => p.slots)
        .find((s) => s.id === this.slotId()) ?? null,
  );
  /** e.g. "Friday, 9 Oct at 04:00 PM", or null until a slot is picked. */
  readonly summary = computed(() => {
    const slot = this.slot();
    return slot ? `${this.day().longLabel} at ${slot.time}` : null;
  });
  readonly total = computed(() => this.type()?.price ?? 0);

  /** Starts a fresh booking when the user switches to a different provider. */
  startFor(providerId: string): void {
    if (this.providerId() === providerId) {
      return;
    }
    this.providerId.set(providerId);
    this.typeId.set(null);
    this.date.set(toIsoDate(new Date()));
    this.slotId.set(null);
  }

  /**
   * Records the booking and returns its id. Returns null if the booking is incomplete.
   * `total` is what the customer pays after discounts; it defaults to the service price.
   */
  confirm(total = this.total()): string | null {
    const providerId = this.providerId();
    const typeId = this.typeId();
    const slotId = this.slotId();
    const when = this.summary();
    if (!providerId || !typeId || !slotId || !when) {
      return null;
    }
    const id = `SC-${String(Date.now()).slice(-6)}`;
    this.confirmed.set({ id, providerId, typeId, slotId, when, total });
    return id;
  }

  /** Clears the in-progress selection after a booking is finished. */
  reset(): void {
    this.providerId.set(null);
    this.typeId.set(null);
    this.date.set(toIsoDate(new Date()));
    this.slotId.set(null);
  }

  /** Re-runs `load` whenever the provider changes; emits `undefined` while a request is in flight. */
  private loadFor<T>(load: (id: string) => Observable<T>, fallback: T): Observable<T | undefined> {
    return toObservable(this.providerId).pipe(
      switchMap((id) =>
        id
          ? load(id).pipe(
              catchError(() => of(fallback)),
              startWith(undefined),
            )
          : of(fallback),
      ),
    );
  }
}

function toAppointmentType(o: ProviderOffering): AppointmentType {
  return {
    id: o.id,
    label: o.name,
    icon: 'home_repair_service',
    durationLabel: `${o.durationMinutes} mins`,
    price: o.price,
    description: o.description,
  };
}
