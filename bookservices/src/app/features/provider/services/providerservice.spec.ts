import { TestBed } from '@angular/core/testing';

import { Providerservice } from './providerservice';

describe('Providerservice', () => {
  let service: Providerservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Providerservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
