import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

export interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class Providerservice {
  http = inject(HttpClient);

  getAllProviders(): Observable<Provider[]> {
    return this.http
      .get<ApiResponse<Provider[]>>('http://localhost:3000/api/providers')
      .pipe(map((res) => res.data));
  }
}
