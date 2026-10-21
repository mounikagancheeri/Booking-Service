import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-category-tile',
  imports: [Icon],
  templateUrl: './category-tile.html',
  styleUrl: './category-tile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTile {
  readonly icon = input('');
  readonly label = input('');
  readonly caption = input('');
  readonly selected = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly picked = output<void>();
}
