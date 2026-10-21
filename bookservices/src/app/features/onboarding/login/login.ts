import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '../../../shared/ui/button/button';
import { Icon } from '../../../shared/ui/icon/icon';
import { SessionStore } from '../../account/session-store';
import { OnboardingSteps } from '../onboarding-steps';

/** Sign-in step 1: phone number (BookIt "02 Phone login"). */
@Component({
  selector: 'app-login',
  imports: [Button, Icon, OnboardingSteps],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private readonly session = inject(SessionStore);

  protected readonly phone = signal('');
  protected readonly whatsapp = signal(this.session.whatsappUpdates());
  protected readonly submitted = signal(false);
  /** Indian mobile numbers are 10 digits starting with 6-9. */
  protected readonly valid = computed(() => /^[6-9]\d{9}$/.test(this.phone()));
  protected readonly showError = computed(() => this.submitted() && !this.valid());

  protected setPhone(value: string): void {
    this.phone.set(value.replace(/\D/g, '').slice(0, 10));
  }

  protected submit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
    if (this.valid()) {
      this.session.requestOtp(this.phone(), this.whatsapp());
      this.router.navigate(['/verify']);
    }
  }

  protected goBack(): void {
    this.location.back();
  }
}
