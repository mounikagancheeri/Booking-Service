import { Routes } from '@angular/router';

import { reviewGuard, successGuard } from './features/booking/booking.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'SkillConnect',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'welcome',
    title: 'Welcome · SkillConnect',
    loadComponent: () => import('./features/onboarding/welcome/welcome').then((m) => m.Welcome),
  },
  {
    path: 'login',
    title: 'Log in · SkillConnect',
    loadComponent: () => import('./features/onboarding/login/login').then((m) => m.Login),
  },
  {
    path: 'verify',
    title: 'Verify your number · SkillConnect',
    loadComponent: () => import('./features/onboarding/otp/otp').then((m) => m.Otp),
  },
  {
    path: 'location',
    title: 'Set your location · SkillConnect',
    loadComponent: () => import('./features/onboarding/location/location').then((m) => m.Location),
  },
  {
    path: 'providers',
    title: 'Specialists · SkillConnect',
    loadComponent: () => import('./features/discovery/results/results').then((m) => m.Results),
  },
  {
    path: 'providers/:providerId',
    title: 'Professional · SkillConnect',
    loadComponent: () =>
      import('./features/provider/provider-profile/provider-profile').then(
        (m) => m.ProviderProfile,
      ),
  },
  {
    path: 'book/:providerId/service',
    title: 'Choose a service · SkillConnect',
    loadComponent: () =>
      import('./features/booking/choose-service/choose-service').then((m) => m.ChooseService),
  },
  {
    path: 'book/:providerId/review',
    title: 'Review booking · SkillConnect',
    canActivate: [reviewGuard],
    loadComponent: () => import('./features/booking/review/review').then((m) => m.Review),
  },
  {
    path: 'book/:providerId/checkout',
    title: 'Checkout · SkillConnect',
    canActivate: [reviewGuard],
    loadComponent: () => import('./features/booking/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'book/:providerId',
    title: 'Book an appointment · SkillConnect',
    loadComponent: () =>
      import('./features/booking/appointment-booking/appointment-booking').then(
        (m) => m.AppointmentBooking,
      ),
  },
  {
    path: 'bookings',
    title: 'My bookings · SkillConnect',
    loadComponent: () => import('./features/account/bookings/bookings').then((m) => m.Bookings),
  },
  {
    path: 'messages',
    title: 'Messages · SkillConnect',
    loadComponent: () => import('./features/account/messages/messages').then((m) => m.Messages),
  },
  {
    path: 'profile',
    title: 'Profile · SkillConnect',
    loadComponent: () => import('./features/account/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'bookings/:bookingId',
    title: 'Booking confirmed · SkillConnect',
    canActivate: [successGuard],
    loadComponent: () =>
      import('./features/booking/booking-success/booking-success').then((m) => m.BookingSuccess),
  },
  { path: '**', redirectTo: '' },
];
