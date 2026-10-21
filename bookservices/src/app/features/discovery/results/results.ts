import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

import { Category, Provider } from '../../../shared/models';
import { CategoryService } from '../../../shared/services/category';
import { ProviderService } from '../../../shared/services/provider';
import { AppHeader } from '../../../shared/ui/app-header/app-header';
import { Badge } from '../../../shared/ui/badge/badge';
import { BottomNav } from '../../../shared/ui/bottom-nav/bottom-nav';
import { Callout } from '../../../shared/ui/callout/callout';
import { FilterChip } from '../../../shared/ui/filter-chip/filter-chip';
import { NAV_ITEMS } from '../../../shared/ui/fixtures';
import { Icon } from '../../../shared/ui/icon/icon';
import { SpecialistCard } from '../components/specialist-card/specialist-card';

const SORTS = ['Recommended', 'Top rated', 'Lowest price'] as const;
type Sort = (typeof SORTS)[number];

/** Stitch "2. AC Repair Results": specialists for one category, with sort and filters. */
@Component({
  selector: 'app-results',
  imports: [AppHeader, Badge, BottomNav, Callout, FilterChip, Icon, RouterLink, SpecialistCard],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  private readonly router = inject(Router);
  private readonly categoryService = inject(CategoryService);
  private readonly providerService = inject(ProviderService);

  /** Bound from the `?categoryId=` query parameter. */
  readonly categoryId = input('');

  protected readonly navItems = NAV_ITEMS;
  protected readonly sort = signal<Sort>('Recommended');
  protected readonly todayOnly = signal(false);
  protected readonly topRatedOnly = signal(false);
  protected readonly budgetOnly = signal(false);
  protected readonly verifiedOnly = signal(false);

  /** `undefined` while loading. */
  private readonly categories = toSignal(
    this.categoryService.getAllCategories().pipe(
      map((list): Category[] | undefined => list),
      catchError(() => of([])),
    ),
    { initialValue: undefined },
  );
  /** `undefined` while loading; refetched whenever the category changes. */
  private readonly providers = toSignal(
    toObservable(this.categoryId).pipe(
      switchMap((id) =>
        this.providerService.getProvidersByCategory(id).pipe(
          map((list): Provider[] | undefined => list),
          catchError(() => of([])),
          startWith(undefined),
        ),
      ),
    ),
    { initialValue: undefined },
  );

  protected readonly loading = computed(
    () => this.categories() === undefined || this.providers() === undefined,
  );
  protected readonly category = computed(() =>
    this.categories()?.find((c) => c.id === this.categoryId()),
  );
  protected readonly specialists = computed(() => {
    const list = (this.providers() ?? []).filter(
      (p) =>
        (!this.todayOnly() || !!p.nextSlot?.startsWith('Today')) &&
        (!this.topRatedOnly() || p.rating >= 4.8) &&
        (!this.budgetOnly() || p.startingPrice <= 500) &&
        (!this.verifiedOnly() || p.verified),
    );
    return [...list].sort(SORT_BY[this.sort()]);
  });
  /** The highlighted card; falls back to the first result when filters remove it. */
  protected readonly selectedId = linkedSignal<Provider[], string | null>({
    source: this.specialists,
    computation: (list, previous) =>
      list.find((p) => p.id === previous?.value)?.id ?? list[0]?.id ?? null,
  });

  protected cycleSort(): void {
    const next = SORTS[(SORTS.indexOf(this.sort()) + 1) % SORTS.length];
    this.sort.set(next);
  }

  protected clearFilters(): void {
    this.todayOnly.set(false);
    this.topRatedOnly.set(false);
    this.budgetOnly.set(false);
    this.verifiedOnly.set(false);
  }

  protected viewProfile(providerId: string): void {
    this.router.navigate(['/providers', providerId]);
  }

  protected book(providerId: string): void {
    this.router.navigate(['/book', providerId, 'service']);
  }
}

const SORT_BY: Record<Sort, (a: Provider, b: Provider) => number> = {
  Recommended: () => 0,
  'Top rated': (a, b) => b.rating - a.rating,
  'Lowest price': (a, b) => a.startingPrice - b.startingPrice,
};
