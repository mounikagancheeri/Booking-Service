import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { SessionStore } from '../../account/session-store';
import { Otp } from './otp';

describe('Otp', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(Otp);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const boxes = () => Array.from(el.querySelectorAll<HTMLInputElement>('fieldset input'));
    const verifyButton = () => el.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    return { fixture, el, boxes, verifyButton, navigate };
  }

  it('shows the number the code was sent to', async () => {
    const { el } = await setup();
    expect(el.textContent).toContain('+91 98765 43210');
  });

  it('spreads a pasted code across the boxes and enables Verify', async () => {
    const { fixture, boxes, verifyButton } = await setup();
    expect(verifyButton().disabled).toBe(true);

    const paste = new Event('paste', { cancelable: true }) as ClipboardEvent;
    Object.defineProperty(paste, 'clipboardData', { value: { getData: () => '482 193' } });
    boxes()[0].dispatchEvent(paste);
    await fixture.whenStable();

    expect(boxes().map((b) => b.value)).toEqual(['4', '8', '2', '1', '9', '3']);
    expect(verifyButton().disabled).toBe(false);
  });

  it('signs in and continues to the location step', async () => {
    const { fixture, boxes, verifyButton, navigate } = await setup();
    for (const [i, box] of boxes().entries()) {
      box.value = String(i);
      box.dispatchEvent(new Event('input'));
    }
    await fixture.whenStable();
    verifyButton().click();
    await fixture.whenStable();

    expect(TestBed.inject(SessionStore).signedIn()).toBe(true);
    expect(navigate).toHaveBeenCalledWith(['/location']);
  });
});
