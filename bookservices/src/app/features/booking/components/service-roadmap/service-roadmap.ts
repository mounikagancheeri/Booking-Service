import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../../../../shared/ui/icon/icon';

export interface RoadmapStep {
  title: string;
  detail: string;
  /** Extra highlighted line, e.g. the arrival time. */
  meta?: string;
  status: 'done' | 'current' | 'upcoming';
}

/** Vertical "what happens next" timeline shown after a booking is confirmed. */
@Component({
  selector: 'app-service-roadmap',
  imports: [Icon],
  template: `
    <ol>
      @for (step of steps(); track step.title; let i = $index) {
        <li [class]="step.status" [attr.aria-current]="step.status === 'current' ? 'step' : null">
          <span class="marker" aria-hidden="true">
            @if (step.status === 'done') {
              <app-icon name="check" [size]="16" />
            } @else {
              {{ i + 1 }}
            }
          </span>
          <div class="body">
            <p class="title">
              {{ step.title }}
              @if (step.status === 'done') {
                <span class="done-label">Done</span>
              }
            </p>
            @if (step.meta) {
              <p class="meta">{{ step.meta }}</p>
            }
            <p class="detail">{{ step.detail }}</p>
          </div>
        </li>
      }
    </ol>
  `,
  styleUrl: './service-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceRoadmap {
  readonly steps = input.required<RoadmapStep[]>();
}
