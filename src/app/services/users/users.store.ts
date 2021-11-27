import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserEntry } from './users.types';

export interface UsersState {
  users: null | UserEntry[];
  page: number;
  perPage: number;
  total: number;
}

export function createInitialState(): UsersState {
  return {
    users: null,
    page: 0,
    perPage: 0,
    total: 0,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends Store<UsersState> {
  constructor() {
    super(createInitialState());
  }
}
