import { TestBed } from '@angular/core/testing';

import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  async function setup() {
    const fixture = TestBed.createComponent(SearchBar);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el, input: el.querySelector('input')! };
  }

  it('labels the input', async () => {
    const { el, input } = await setup();
    const label = el.querySelector(`label[for="${input.id}"]`);
    expect(label?.textContent).toContain('Search verified services');
  });

  it('updates the value and emits a trimmed search on submit', async () => {
    const { fixture, el, input } = await setup();
    const searches: string[] = [];
    fixture.componentInstance.search.subscribe((term) => searches.push(term));

    input.value = '  Plumber ';
    input.dispatchEvent(new Event('input'));
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));

    expect(fixture.componentInstance.value()).toBe('  Plumber ');
    expect(searches).toEqual(['Plumber']);
  });

  it('announces the active filter count', async () => {
    const { fixture, el } = await setup();
    fixture.componentRef.setInput('filterCount', 2);
    await fixture.whenStable();
    expect(el.querySelector('.filters')?.textContent).toMatch(/Filters.*\(2 active\)/s);
  });

  it('disables the input and filter button', async () => {
    const { fixture, el, input } = await setup();
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    expect(input.disabled).toBe(true);
    expect(el.querySelector<HTMLButtonElement>('.filters')!.disabled).toBe(true);
  });
});
