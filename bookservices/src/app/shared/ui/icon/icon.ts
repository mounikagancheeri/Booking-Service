import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

/**
 * Material Symbols icon. Decorative by default (hidden from assistive tech);
 * pass `label` when the icon carries meaning on its own.
 *
 * The ligature name is drawn via CSS generated content rather than text, so it never becomes
 * part of a parent button's or link's text (which would read as "arrow_back Edit").
 */
@Component({
  selector: 'app-icon',
  template: '',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'material-symbols-outlined',
    translate: 'no',
    '[attr.data-icon]': 'name()',
    '[class.filled]': 'filled()',
    '[style.font-size.px]': 'size()',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() || null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(20);
  readonly filled = input(false, { transform: booleanAttribute });
  readonly label = input<string>();
}
