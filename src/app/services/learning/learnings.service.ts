import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LearningsStore } from './learnings.store';
import { LearningEntry } from './learnings.types';

@Injectable({
  providedIn: 'root',
})
export class LearningsService {
  constructor(
    private _http: HttpClient,
    private _learningsStore: LearningsStore
  ) {}

  get(opts?: { page?: number; limit?: number; isDry?: boolean }) {
    const page = opts?.page || this._learningsStore.getValue().page || 1;
    const limit = opts?.limit || this._learningsStore.getValue().perPage || 10;
    return this._http
      .get<LearningEntry[]>('/learnings', {
        params: {
          _page: String(page),
          _limit: String(limit),
        },
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          const learnings = response.body;
          const total = Number(response.headers.get('X-Total-Count'));
          if (!opts?.isDry) {
            this._learningsStore.update({
              learnings,
              page,
              perPage: limit,
              total,
            });
          }
        })
      );
  }

  getById(id: number | number[]) {
    const ids = typeof id === 'number' ? [id] : id;
    const idsConcat = `?${ids.map((el) => `id=${el}`).join('&')}`;
    return this._http.get<LearningEntry[]>(`/learnings${idsConcat}`);
  }
}
