import { TestBed } from '@angular/core/testing';

import { CATEGORIES } from '../fixtures';
import { CategoryGrid } from './category-grid';

describe('CategoryGrid', () => {
  async function setup(inputs: Record<string, unknown>) {
    const fixture = TestBed.createComponent(CategoryGrid);
    for (const [name, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(name, value);
    }
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('renders one tile per category', async () => {
    const { el } = await setup({ categories: CATEGORIES });
    expect(el.querySelectorAll('button[aria-pressed]').length).toBe(CATEGORIES.length);
  });

  it('selects a category on click', async () => {
    const { fixture, el } = await setup({ categories: CATEGORIES });
    el.querySelectorAll<HTMLButtonElement>('button')[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.selectedId()).toBe('electrician');
    expect(el.querySelectorAll('button')[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('shows skeletons while loading', async () => {
    const { el } = await setup({ categories: CATEGORIES, loading: true });
    expect(el.querySelector('[role="status"]')).toBeTruthy();
    expect(el.querySelector('button')).toBeNull();
  });

  it('shows the empty message when there are no categories', async () => {
    const { el } = await setup({ categories: [], emptyText: 'Nothing here' });
    expect(el.textContent).toContain('Nothing here');
  });
});
