import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models';

/** Shape of a category as returned by the API. */
interface ApiCategory extends Omit<Category, 'id'> {
  id: number | string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<ApiResponse<ApiCategory[]>>('http://localhost:3000/api/categories')
      .pipe(map((res) => res.data.map((c) => ({ ...c, id: String(c.id) }))));
  }
}
