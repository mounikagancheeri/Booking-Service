import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Provider, ProviderOffering, ProviderSlot } from '../models';

/** Shape of a provider as returned by the API. */
interface ApiProvider {
  id: number | string;
  name: string;
  specialization: string;
  categoryId: number | string;
  rating: number;
  reviews: number;
  experience: number;
  priceFrom: number;
  verified: boolean;
  location: string;
  /** ISO date-time, e.g. "2026-10-10T16:00:00". */
  nextAvailable: string;
}

/** Shape of a provider's service as returned by the API. */
interface ApiOffering {
  id: number | string;
  providerId: number | string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
}

/** Shape of a provider's slot as returned by the API. */
interface ApiSlot {
  id: number | string;
  providerId: number | string;
  date: string;
  time: string;
  available: boolean;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  http = inject(HttpClient);

  getAllProviders(): Observable<Provider[]> {
    return this.http
      .get<ApiResponse<ApiProvider[]>>('http://localhost:3000/api/providers')
      .pipe(map((res) => res.data.map(toProvider)));
  }

  getProvidersByCategory(categoryId: string): Observable<Provider[]> {
    return this.http
      .get<ApiResponse<ApiProvider[]>>('http://localhost:3000/api/providers', {
        params: { categoryId },
      })
      .pipe(map((res) => res.data.map(toProvider)));
  }

  getProviderById(id: string): Observable<Provider> {
    return this.http
      .get<ApiResponse<ApiProvider>>(
        `http://localhost:3000/api/providers/${encodeURIComponent(id)}`,
      )
      .pipe(map((res) => toProvider(res.data)));
  }

  getServicesByProviderId(providerId: string): Observable<ProviderOffering[]> {
    return this.http
      .get<ApiResponse<ApiOffering[]>>(
        `http://localhost:3000/api/providers/${encodeURIComponent(providerId)}/services`,
      )
      .pipe(
        map((res) =>
          res.data.map((s) => ({
            id: String(s.id),
            name: s.name,
            price: s.price,
            durationMinutes: s.durationMinutes,
            description: s.description,
          })),
        ),
      );
  }

  /** Arrival slots for one day; `date` is `YYYY-MM-DD`. */
  getSlots(providerId: string, date: string): Observable<ProviderSlot[]> {
    return this.http
      .get<ApiResponse<ApiSlot[]>>(
        `http://localhost:3000/api/providers/${encodeURIComponent(providerId)}/slots`,
        { params: { date } },
      )
      .pipe(
        map((res) =>
          res.data.map((s) => ({
            id: String(s.id),
            date: s.date,
            time: s.time,
            available: s.available,
          })),
        ),
      );
  }
}

function toProvider(p: ApiProvider): Provider {
  return {
    id: String(p.id),
    name: p.name,
    title: p.specialization,
    experienceYears: p.experience,
    rating: p.rating,
    reviewCount: p.reviews,
    startingPrice: p.priceFrom,
    verified: p.verified,
    area: p.location,
    nextSlot: formatSlot(p.nextAvailable),
    categoryIds: [String(p.categoryId)],
  };
}

/** "2026-10-10T16:00:00" -> "Sat, 10 Oct, 04:00 PM". */
function formatSlot(iso: string): string | undefined {
  const date = new Date(iso);
  if (isNaN(date.getTime())) {
    return undefined;
  }
  return date.toLocaleString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
