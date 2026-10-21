import { ChangeDetectionStrategy, Component, booleanAttribute, input, model } from '@angular/core';

import { Category } from '../../models';
import { CategoryTile } from '../category-tile/category-tile';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-category-grid',
  imports: [CategoryTile, Icon],
  templateUrl: './category-grid.html',
  styleUrl: './category-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryGrid {
  readonly categories = input<Category[]>([]);
  readonly selectedId = model<string | null>(null);
  readonly label = input('Service categories');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly emptyText = input('No service categories available in your area yet.');

  protected readonly placeholders = [1, 2, 3, 4, 5, 6];
}
