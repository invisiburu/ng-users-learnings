import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LearningsStore, LearningsState } from './learnings.store';

@Injectable({ providedIn: 'root' })
export class LearningsQuery extends Query<LearningsState> {
  learnings$ = this.select((state) => state.learnings);
  learningsPage$ = this.select((state) => state.page);
  learningsPerPage$ = this.select((state) => state.perPage);
  learningsTotal$ = this.select((state) => state.total);

  constructor(protected store: LearningsStore) {
    super(store);
  }
}
