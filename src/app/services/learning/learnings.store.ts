import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { LearningEntry } from './learnings.types';

export interface LearningsState {
  learnings: null | LearningEntry[];
  page: number;
  perPage: number;
  total: number;
}

export function createInitialState(): LearningsState {
  return {
    learnings: null,
    page: 0,
    perPage: 0,
    total: 0,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'learnings' })
export class LearningsStore extends Store<LearningsState> {
  constructor() {
    super(createInitialState());
  }
}
