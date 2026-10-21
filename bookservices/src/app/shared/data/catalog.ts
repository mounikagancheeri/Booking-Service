import { Injectable } from '@angular/core';

import { Category, Provider } from '../models';
import { ALL_PROVIDERS, CATEGORIES } from '../ui/fixtures';

/** Read-only access to categories and providers. Backed by mock data until there is an API. */
@Injectable({ providedIn: 'root' })
export class Catalog {
  readonly categories: Category[] = CATEGORIES;
  readonly providers: Provider[] = ALL_PROVIDERS;

  category(id: string | null | undefined): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  provider(id: string | null | undefined): Provider | undefined {
    return this.providers.find((p) => p.id === id);
  }

  providersIn(categoryId: string): Provider[] {
    return this.providers.filter((p) => p.categoryIds?.includes(categoryId));
  }

  /** Simple label match for the home search box. */
  findCategory(term: string): Category | undefined {
    const q = term.trim().toLowerCase();
    return q ? this.categories.find((c) => c.label.toLowerCase().includes(q)) : undefined;
  }
}
