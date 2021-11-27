import { Injectable } from '@angular/core';
import { UsersStore } from '@/services/users/users.store';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserEntry } from './users.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _usersStore: UsersStore) {}

  getAll(): Observable<UserEntry[]> {
    return from(import('@assets/mocks/Users.json')).pipe(
      tap((m) => {
        this._usersStore.updateUsers((m as any).default);
      })
    );
  }
}
