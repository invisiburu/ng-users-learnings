import { Injectable } from '@angular/core';
import { UsersStore } from '@/services/users/users.store';
import { exhaustMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserEntry } from './users.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient, private _usersStore: UsersStore) {}

  get(opts?: { page?: number; limit?: number }) {
    const page = opts?.page || this._usersStore.getValue().page || 1;
    const limit = opts?.limit || this._usersStore.getValue().perPage || 10;
    return this._http
      .get<UserEntry[]>('/users', {
        params: {
          _page: String(page),
          _limit: String(limit),
        },
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          const users = response.body;
          const total = Number(response.headers.get('X-Total-Count'));
          this._usersStore.update({ users, page, perPage: limit, total });
        })
      );
  }

  create(user: Omit<UserEntry, 'id'>) {
    return this._http.post<UserEntry>('/users', user);
  }

  delete(userId: number) {
    return this._http.delete(`/users/${userId}`);
  }
}
