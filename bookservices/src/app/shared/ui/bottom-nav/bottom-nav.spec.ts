import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NAV_ITEMS } from '../fixtures';
import { BottomNav } from './bottom-nav';

describe('BottomNav', () => {
  async function setup(activeId: string) {
    TestBed.configureTestingModule({ providers: [provideRouter([{ path: '**', children: [] }])] });
    const fixture = TestBed.createComponent(BottomNav);
    fixture.componentRef.setInput('items', NAV_ITEMS);
    fixture.componentRef.setInput('activeId', activeId);
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('marks only the active item as the current page', async () => {
    const { el } = await setup('home');
    const current = el.querySelectorAll('a[aria-current="page"]');
    expect(current.length).toBe(1);
    expect(current[0].textContent).toContain('Home');
  });

  it('updates the active item on click', async () => {
    const { fixture, el } = await setup('home');
    el.querySelectorAll<HTMLAnchorElement>('a')[1].click();
    await fixture.whenStable();

    expect(fixture.componentInstance.activeId()).toBe('bookings');
    expect(el.querySelector('a[aria-current="page"]')?.textContent).toContain('Bookings');
  });
});
