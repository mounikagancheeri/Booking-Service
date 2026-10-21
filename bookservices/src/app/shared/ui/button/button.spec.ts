import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Button } from './button';

@Component({
  imports: [Button],
  template: `<button appButton type="button" [loading]="loading()" [disabled]="disabled()">
    Book
  </button>`,
})
class Host {
  readonly loading = signal(false);
  readonly disabled = signal(false);
}

describe('Button', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    return { fixture, button };
  }

  it('is enabled by default', async () => {
    const { button } = await setup();
    expect(button.disabled).toBe(false);
    expect(button.classList).toContain('btn--primary');
  });

  it('disables itself and sets aria-busy while loading', async () => {
    const { fixture, button } = await setup();
    fixture.componentInstance.loading.set(true);
    await fixture.whenStable();

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('.spinner')).toBeTruthy();
  });

  it('can be disabled', async () => {
    const { fixture, button } = await setup();
    fixture.componentInstance.disabled.set(true);
    await fixture.whenStable();

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBeNull();
  });
});
