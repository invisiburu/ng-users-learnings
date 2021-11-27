import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UsersStore, UsersState } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends Query<UsersState> {
  users$ = this.select((state) => state.users)

  constructor(protected store: UsersStore) {
    super(store);
  }
}
