import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category';

describe('CategoryService', () => {
  let service: CategoryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CategoryService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('fetches all categories from the API', () => {
    let result: unknown;
    service.getAllCategories().subscribe((c) => (result = c));
    http.expectOne('http://localhost:3000/api/categories').flush({
      message: 'Categories fetched successfully',
      data: [{ id: 1, label: 'AC Repair', icon: 'mode_fan', caption: '12 Pros' }],
    });
    expect(result).toEqual([{ id: '1', label: 'AC Repair', icon: 'mode_fan', caption: '12 Pros' }]);
  });
});
