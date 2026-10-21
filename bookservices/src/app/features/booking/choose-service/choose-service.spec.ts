import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { flushProvider } from '../../../shared/testing/api';
import { BookingStore } from '../booking-store';
import { ChooseService } from './choose-service';

describe('ChooseService', () => {
  async function setup(providerId = '1', found = true) {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(ChooseService);
    fixture.componentRef.setInput('providerId', providerId);
    fixture.detectChanges();
    flushProvider(providerId, { found });
    await fixture.whenStable();
    return { fixture, el: fixture.nativeElement as HTMLElement, navigate };
  }

  it('lists the services from the API with none picked', async () => {
    const { el } = await setup();
    const inputs = Array.from(
      el.querySelectorAll<HTMLInputElement>('app-service-package-card input'),
    );
    expect(inputs.map((i) => i.value)).toEqual(['1', '2', '3']);
    expect(inputs.some((i) => i.checked)).toBe(false);
    expect(el.textContent).toContain('AC General Service');
    expect(el.querySelector<HTMLButtonElement>('app-booking-summary-bar button')!.disabled).toBe(
      true,
    );
  });

  it('switches package and continues to date and time', async () => {
    const { fixture, el, navigate } = await setup();
    el.querySelector<HTMLInputElement>('input[value="3"]')!.click();
    await fixture.whenStable();
    expect(TestBed.inject(BookingStore).typeId()).toBe('3');
    expect(el.querySelector('app-booking-summary-bar')?.textContent).toContain('₹799');

    el.querySelector<HTMLButtonElement>('app-booking-summary-bar button')!.click();
    expect(navigate).toHaveBeenCalledWith(['/book', '1']);
  });

  it('shows a message for an unknown provider', async () => {
    const { el } = await setup('99', false);
    expect(el.textContent).toContain("couldn't find this professional");
  });
});
