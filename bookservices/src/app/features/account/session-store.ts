import { Injectable, computed, signal } from '@angular/core';

import { SAVED_ADDRESSES, SavedAddress } from './data/account.mock';

/** The signed-in user and their service address. There is no auth API yet, so it is all mock. */
@Injectable({ providedIn: 'root' })
export class SessionStore {
  readonly name = signal('Priya Reddy');
  readonly email = signal('priya.reddy@example.com');
  /** 10-digit Indian mobile number, without the +91 prefix. */
  readonly phone = signal('9876543210');
  readonly whatsappUpdates = signal(true);
  readonly signedIn = signal(false);

  readonly addresses = signal<SavedAddress[]>(SAVED_ADDRESSES);
  readonly addressId = signal(SAVED_ADDRESSES[0].id);
  readonly address = computed(
    () => this.addresses().find((a) => a.id === this.addressId()) ?? this.addresses()[0],
  );

  /** e.g. "+91 98765 43210". */
  readonly formattedPhone = computed(() => formatPhone(this.phone()));

  /** Starts sign-in with a phone number; the OTP screen finishes it. */
  requestOtp(phone: string, whatsappUpdates: boolean): void {
    this.phone.set(phone);
    this.whatsappUpdates.set(whatsappUpdates);
  }

  /** Mock check: any 6-digit code is accepted. */
  verifyOtp(code: string): boolean {
    const valid = /^\d{6}$/.test(code);
    if (valid) {
      this.signedIn.set(true);
    }
    return valid;
  }

  /** Adds (or replaces) the device's current location and selects it. */
  useCurrentLocation(latitude: number, longitude: number): void {
    const current: SavedAddress = {
      id: 'current',
      label: 'Current location',
      icon: 'my_location',
      line: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      area: 'Pinned from your device',
    };
    this.addresses.update((list) => [current, ...list.filter((a) => a.id !== 'current')]);
    this.addressId.set(current.id);
  }

  signOut(): void {
    this.signedIn.set(false);
  }
}

export function formatPhone(digits: string): string {
  return digits.length === 10 ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` : `+91 ${digits}`;
}
