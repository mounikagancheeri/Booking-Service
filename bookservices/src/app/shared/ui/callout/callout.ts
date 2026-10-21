import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../icon/icon';

export type CalloutVariant = 'info' | 'warning';

/** Icon tile + title + projected body text, for notices such as demand alerts or guarantees. */
@Component({
  selector: 'app-callout',
  imports: [Icon],
  template: `
    <span class="tile">
      <app-icon [name]="icon()" [size]="18" />
    </span>
    <div class="body">
      <p class="title">{{ heading() }}</p>
      <p class="text"><ng-content /></p>
    </div>
  `,
  styleUrl: './callout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '"callout--" + variant()' },
})
export class Callout {
  readonly heading = input.required<string>();
  readonly icon = input('info');
  readonly variant = input<CalloutVariant>('info');
}
