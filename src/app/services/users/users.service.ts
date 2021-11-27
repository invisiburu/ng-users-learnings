import { Injectable } from '@angular/core';
import { UsersStore } from '@/services/users/users.store';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserEntry } from './users.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient, private _usersStore: UsersStore) {}

  get(opts?: { page?: string }) {
    return this._http.get<UserEntry[]>('/users', { params: opts }).pipe(
      tap((users) => {
        this._usersStore.updateUsers(users);
      })
    );
  }
}
