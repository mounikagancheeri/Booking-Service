import { Location as BrowserLocation } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Badge } from '../../../shared/ui/badge/badge';
import { Button } from '../../../shared/ui/button/button';
import { Icon } from '../../../shared/ui/icon/icon';
import { SessionStore } from '../../account/session-store';
import { OnboardingSteps } from '../onboarding-steps';

/** Sign-in step 3, also reachable from Profile > Saved addresses (BookIt "04 Set your location"). */
@Component({
  selector: 'app-location',
  imports: [Badge, Button, Icon, OnboardingSteps],
  templateUrl: './location.html',
  styleUrl: './location.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Location {
  private readonly browserLocation = inject(BrowserLocation);
  private readonly router = inject(Router);
  protected readonly session = inject(SessionStore);

  protected readonly query = signal('');
  protected readonly locating = signal(false);
  protected readonly locateError = signal<string | null>(null);
  protected readonly matches = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.session
      .addresses()
      .filter((a) => !q || `${a.label} ${a.line} ${a.area}`.toLowerCase().includes(q));
  });

  protected useCurrentLocation(): void {
    if (!('geolocation' in navigator)) {
      this.locateError.set('Location isn’t available in this browser.');
      return;
    }
    this.locating.set(true);
    this.locateError.set(null);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.locating.set(false);
        this.session.useCurrentLocation(coords.latitude, coords.longitude);
      },
      () => {
        this.locating.set(false);
        this.locateError.set('We couldn’t get your location. Pick a saved address instead.');
      },
      { timeout: 10000 },
    );
  }

  protected confirm(): void {
    this.router.navigate(['/']);
  }

  protected goBack(): void {
    this.browserLocation.back();
  }
}
