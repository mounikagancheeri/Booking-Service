import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface PriceLine {
  label: string;
  /** Amount in INR; omit to show `note` only (e.g. "Included"). */
  amount?: number;
  /** Shown struck through when a fee is waived. */
  waived?: boolean;
  note?: string;
}

@Component({
  selector: 'app-price-breakdown',
  imports: [CurrencyPipe],
  template: `
    <dl>
      @for (line of lines(); track line.label) {
        <div class="row">
          <dt>{{ line.label }}</dt>
          <dd>
            @if (line.amount !== undefined) {
              @if (line.waived) {
                <s>{{ line.amount | currency: 'INR' : 'symbol' : '1.0-0' }}</s>
              } @else {
                {{ line.amount | currency: 'INR' : 'symbol' : '1.0-0' }}
              }
            }
            @if (line.note) {
              <span class="note">{{ line.note }}</span>
            }
          </dd>
        </div>
      }
      <div class="row total">
        <dt>
          Total payable
          @if (totalNote(); as note) {
            <span class="total-note">{{ note }}</span>
          }
        </dt>
        <dd>{{ total() | currency: 'INR' : 'symbol' : '1.0-0' }}</dd>
      </div>
    </dl>
  `,
  styleUrl: './price-breakdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceBreakdown {
  readonly lines = input.required<PriceLine[]>();
  readonly total = input.required<number>();
  readonly totalNote = input<string>();
}
