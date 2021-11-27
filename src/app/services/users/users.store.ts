import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserEntry } from './users.types';

export interface UsersState {
  users: null | UserEntry[];
}

export function createInitialState(): UsersState {
  return {
    users: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends Store<UsersState> {
  constructor() {
    super(createInitialState());
  }

  updateUsers(users: null | UserEntry[]) {
    this.update({ users });
  }
}
