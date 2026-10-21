import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  model,
  output,
} from '@angular/core';

import { Icon } from '../icon/icon';

let nextId = 0;

@Component({
  selector: 'app-search-bar',
  imports: [Icon],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  readonly value = model('');
  readonly label = input('Search verified services');
  readonly placeholder = input('Search services (e.g. AC Repair, Electrician)…');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly filterCount = input(0);

  readonly search = output<string>();
  readonly openFilters = output<void>();

  protected readonly inputId = `search-bar-${nextId++}`;

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.search.emit(this.value().trim());
  }
}
