import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { BookingStore } from './booking-store';

/** Review needs a chosen slot for this provider; otherwise go back to Date & Time. */
export const reviewGuard: CanActivateFn = (route) => {
  const store = inject(BookingStore);
  const providerId = route.paramMap.get('providerId');
  return store.providerId() === providerId && store.slot()
    ? true
    : inject(Router).createUrlTree(['/book', providerId]);
};

/** The success screen only shows the booking that was just confirmed. */
export const successGuard: CanActivateFn = (route) => {
  const confirmed = inject(BookingStore).confirmed();
  return confirmed?.id === route.paramMap.get('bookingId')
    ? true
    : inject(Router).createUrlTree(['/']);
};
