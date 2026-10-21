import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { Catalog } from '../../shared/data/catalog';
import { Provider } from '../../shared/models';
import { CategoryService } from '../../shared/services/category';
import { ProviderService } from '../../shared/services/provider';
import { AppHeader } from '../../shared/ui/app-header/app-header';
import { Badge } from '../../shared/ui/badge/badge';
import { BottomNav } from '../../shared/ui/bottom-nav/bottom-nav';
import { Button } from '../../shared/ui/button/button';
import { CategoryGrid } from '../../shared/ui/category-grid/category-grid';
import { NAV_ITEMS } from '../../shared/ui/fixtures';
import { Icon } from '../../shared/ui/icon/icon';
import { ProviderCard } from '../../shared/ui/provider-card/provider-card';
import { ProviderList } from '../../shared/ui/provider-list/provider-list';
import { SearchBar } from '../../shared/ui/search-bar/search-bar';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

interface ProtocolPoint {
  icon: string;
  title: string;
  text: string;
}

/** Stitch "1. Home - Discover". */
@Component({
  selector: 'app-home',
  imports: [
    AppHeader,
    Badge,
    BottomNav,
    Button,
    CategoryGrid,
    Icon,
    ProviderCard,
    ProviderList,
    SearchBar,
    SectionHeader,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly router = inject(Router);
  private readonly catalog = inject(Catalog);
  private readonly categoryService = inject(CategoryService);
  private readonly providerService = inject(ProviderService);

  protected readonly navItems = NAV_ITEMS;
  protected readonly categories = toSignal(this.categoryService.getAllCategories(), {
    initialValue: [],
  });
  private readonly providers = toSignal(this.providerService.getAllProviders(), {
    initialValue: [],
  });
  /** Highest-rated provider; undefined (card shows a skeleton) until the API responds. */
  protected readonly spotlight = computed(() =>
    this.providers().reduce<Provider | undefined>(
      (best, p) => (!best || p.rating > best.rating ? p : best),
      undefined,
    ),
  );
  protected readonly nearby = this.catalog.providers.filter(
    (p) => p.id === 'suresh-kumar' || p.id === 'ananya-rao',
  );
  protected readonly searchTerm = signal('');
  protected readonly searchMessage = signal('');
  protected readonly selectedCategory = signal<string | null>(null);

  protected readonly protocol: ProtocolPoint[] = [
    {
      icon: 'badge',
      title: 'Rigorous Background Verification',
      text: 'Criminal record checks, technical skill audits & ID verification before dispatch.',
    },
    {
      icon: 'receipt_long',
      title: 'Transparent Fixed Pricing',
      text: 'Standardized rate matrices. Zero surge fees or surprise on-site surcharges.',
    },
    {
      icon: 'lock',
      title: '100% Escrow Protection',
      text: 'Funds are released only after your digital sign-off and inspection.',
    },
  ];

  protected openCategory(id: string | null): void {
    if (id) {
      this.router.navigate(['/providers'], { queryParams: { categoryId: id } });
    }
  }

  protected search(term: string): void {
    const q = term.trim().toLowerCase();
    const match = q ? this.categories().find((c) => c.label.toLowerCase().includes(q)) : undefined;
    if (match) {
      this.searchMessage.set('');
      this.openCategory(match.id);
    } else {
      this.searchMessage.set(`No services match "${term}". Try "AC Repair" or "Electrician".`);
    }
  }

  protected book(providerId: string): void {
    this.router.navigate(['/book', providerId, 'service']);
  }

  protected viewProfile(providerId: string): void {
    this.router.navigate(['/providers', providerId]);
  }
}
