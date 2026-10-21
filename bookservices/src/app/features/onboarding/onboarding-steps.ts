import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** "Step 2 of 3" progress dashes shown on the sign-in screens. */
@Component({
  selector: 'app-onboarding-steps',
  template: `
    @for (step of steps(); track step) {
      <span class="dash" [class.done]="step <= current()"></span>
    }
  `,
  styles: `
    :host {
      display: flex;
      gap: 6px;
    }
    .dash {
      width: 22px;
      height: 6px;
      border-radius: 3px;
      background: var(--color-border-strong);
    }
    .done {
      background: var(--color-primary-container);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'img', '[attr.aria-label]': '"Step " + current() + " of " + total()' },
})
export class OnboardingSteps {
  readonly current = input.required<number>();
  readonly total = input(3);

  protected readonly steps = computed(() => Array.from({ length: this.total() }, (_, i) => i + 1));
}
