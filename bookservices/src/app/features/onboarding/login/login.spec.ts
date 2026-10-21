import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { SessionStore } from '../../account/session-store';
import { Login } from './login';

describe('Login', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(Login);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector<HTMLInputElement>('#phone')!;
    const type = async (value: string) => {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      await fixture.whenStable();
    };
    const submit = async () => {
      el.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
      await fixture.whenStable();
    };
    return { el, input, type, submit, navigate };
  }

  it('keeps only digits, up to 10', async () => {
    const { input, type } = await setup();
    await type('98765-43210 99');
    expect(input.value).toBe('9876543210');
  });

  it('shows an error for an invalid number and stays on the page', async () => {
    const { el, type, submit, navigate } = await setup();
    await type('12345');
    await submit();

    expect(el.querySelector('#phone-error')?.textContent).toContain('10-digit');
    expect(navigate).not.toHaveBeenCalled();
  });

  it('stores the number and continues to the OTP screen', async () => {
    const { type, submit, navigate } = await setup();
    await type('9848012345');
    await submit();

    expect(TestBed.inject(SessionStore).phone()).toBe('9848012345');
    expect(navigate).toHaveBeenCalledWith(['/verify']);
  });
});
