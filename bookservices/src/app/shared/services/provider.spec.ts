import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Provider, ProviderOffering } from '../models';
import { ProviderService } from './provider';

describe('ProviderService', () => {
  let service: ProviderService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProviderService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('fetches providers and maps them to the app model', () => {
    let result: Provider[] = [];
    service.getAllProviders().subscribe((p) => (result = p));
    http.expectOne('http://localhost:3000/api/providers').flush({
      message: 'Providers fetched successfully',
      data: [
        {
          id: 1,
          name: 'Rahul Sharma',
          specialization: 'AC Technician',
          categoryId: 1,
          rating: 4.9,
          reviews: 124,
          experience: 7,
          priceFrom: 499,
          verified: true,
          location: 'Gachibowli, Hyderabad',
          nextAvailable: '2026-10-10T16:00:00',
        },
      ],
    });
    expect(result[0]).toMatchObject({
      id: '1',
      name: 'Rahul Sharma',
      title: 'AC Technician',
      experienceYears: 7,
      reviewCount: 124,
      startingPrice: 499,
      area: 'Gachibowli, Hyderabad',
      categoryIds: ['1'],
    });
    expect(result[0].nextSlot).toContain('Oct');
  });

  it('fetches a single provider by id', () => {
    let result: Provider | undefined;
    service.getProviderById('3').subscribe((p) => (result = p));
    http.expectOne('http://localhost:3000/api/providers/3').flush({
      success: true,
      data: {
        id: 3,
        name: 'Suresh Kumar',
        specialization: 'Electrician',
        categoryId: 3,
        rating: 4.8,
        reviews: 98,
        experience: 8,
        priceFrom: 350,
        verified: true,
        location: 'Kondapur, Hyderabad',
        nextAvailable: '2026-10-11T10:00:00',
      },
    });
    expect(result).toMatchObject({ id: '3', name: 'Suresh Kumar', title: 'Electrician' });
  });

  it("fetches a provider's services", () => {
    let result: ProviderOffering[] = [];
    service.getServicesByProviderId('1').subscribe((s) => (result = s));
    http.expectOne('http://localhost:3000/api/providers/1/services').flush({
      success: true,
      data: [
        {
          id: 2,
          providerId: 1,
          name: 'AC General Service',
          price: 999,
          durationMinutes: 60,
          description: 'Complete cleaning and maintenance',
        },
      ],
    });
    expect(result).toEqual([
      {
        id: '2',
        name: 'AC General Service',
        price: 999,
        durationMinutes: 60,
        description: 'Complete cleaning and maintenance',
      },
    ]);
  });
});
