import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Button } from '../../../shared/ui/button/button';
import { Icon } from '../../../shared/ui/icon/icon';
import { SessionStore } from '../../account/session-store';
import { OnboardingSteps } from '../onboarding-steps';

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

/** Sign-in step 2: one-time code (BookIt "03 Verify OTP"). */
@Component({
  selector: 'app-otp',
  imports: [Button, Icon, OnboardingSteps, RouterLink],
  templateUrl: './otp.html',
  styleUrl: './otp.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Otp {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  protected readonly session = inject(SessionStore);

  private readonly boxes = viewChildren<ElementRef<HTMLInputElement>>('box');

  protected readonly digits = signal<string[]>(Array(CODE_LENGTH).fill(''));
  protected readonly code = computed(() => this.digits().join(''));
  protected readonly complete = computed(() => this.code().length === CODE_LENGTH);
  protected readonly error = signal(false);
  protected readonly secondsLeft = signal(RESEND_SECONDS);
  protected readonly countdown = computed(
    () => `00:${String(this.secondsLeft()).padStart(2, '0')}`,
  );

  constructor() {
    const timer = setInterval(() => this.secondsLeft.update((s) => Math.max(0, s - 1)), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  protected onInput(index: number, input: HTMLInputElement): void {
    const typed = input.value.replace(/\D/g, '');
    if (typed.length > 1) {
      this.fill(index, typed);
      return;
    }
    this.setDigit(index, typed);
    input.value = typed;
    if (typed) {
      this.focus(index + 1);
    }
  }

  protected onKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.digits()[index]) {
      event.preventDefault();
      this.setDigit(index - 1, '');
      this.focus(index - 1);
    }
  }

  protected onPaste(index: number, event: ClipboardEvent): void {
    event.preventDefault();
    this.fill(index, event.clipboardData?.getData('text').replace(/\D/g, '') ?? '');
  }

  protected resend(): void {
    this.secondsLeft.set(RESEND_SECONDS);
    this.digits.set(Array(CODE_LENGTH).fill(''));
    this.error.set(false);
    this.focus(0);
  }

  protected verify(event: Event): void {
    event.preventDefault();
    if (this.session.verifyOtp(this.code())) {
      this.router.navigate(['/location']);
    } else {
      this.error.set(true);
    }
  }

  protected goBack(): void {
    this.location.back();
  }

  /** Spreads several digits (typed fast or pasted) across the boxes from `index`. */
  private fill(index: number, text: string): void {
    const next = [...this.digits()];
    for (const [i, digit] of [...text].entries()) {
      if (index + i < CODE_LENGTH) {
        next[index + i] = digit;
      }
    }
    this.digits.set(next);
    this.error.set(false);
    this.focus(Math.min(index + text.length, CODE_LENGTH - 1));
  }

  private setDigit(index: number, digit: string): void {
    if (index < 0) {
      return;
    }
    this.digits.update((list) => list.map((d, i) => (i === index ? digit : d)));
    this.error.set(false);
  }

  private focus(index: number): void {
    this.boxes()[index]?.nativeElement.focus();
  }
}
