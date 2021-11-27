import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LearningsQuery } from '@/services/learning/learnings.query';
import { LearningsService } from '@/services/learning/learnings.service';
import { LearningEntry } from '@/services/learning/learnings.types';
import { CreateLearningModal } from '@/modals/create-learning/create-learning.modal';
import { ConfirmModal } from '@/modals/confirm/confirm.modal';

@Component({
  selector: 'app-learnings-list',
  templateUrl: './learnings-list.component.html',
  styleUrls: ['./learnings-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningsListComponent implements OnInit {
  learnings$: Observable<LearningEntry[]>;
  learningsPage$: Observable<number>;
  learningsPerPage$: Observable<number>;
  learningsTotal$: Observable<number>;

  constructor(
    private _learningsService: LearningsService,
    private _learningsQuery: LearningsQuery,
    private _modalService: NgbModal
  ) {
    this.learnings$ = this._learningsQuery.learnings$;
    this.learningsPage$ = this._learningsQuery.learningsPage$;
    this.learningsPerPage$ = this._learningsQuery.learningsPerPage$;
    this.learningsTotal$ = this._learningsQuery.learningsTotal$;
  }

  ngOnInit(): void {
    this.getPage();
  }

  learningTrackBy(idx: number, item: LearningEntry) {
    return item.id;
  }

  getPage(page = 1) {
    return this._learningsService.get({ page }).pipe(first()).subscribe();
  }

  onCreateClick() {
    this._modalService.open(CreateLearningModal);
  }

  onSwitchActiveClick(learning: LearningEntry) {
    this._learningsService
      .patch(learning.id, { is_active: !learning.is_active })
      .pipe(
        first(),
        mergeMap(() => this._learningsService.get())
      )
      .subscribe();
  }

  onDeleteClick(learning: LearningEntry) {
    const modal = this._modalService.open(ConfirmModal);
    const instance = modal.componentInstance as ConfirmModal;
    instance.title = 'Confirm deletion';
    instance.message = `Are you sure you want to delete ${learning.name}? This action cannot be undone.`;
    instance.confirmTxt = 'Delete';
    instance.isDanger = true;
    instance.onConfirm = () =>
      this._learningsService.delete(learning.id).pipe(
        first(),
        mergeMap(() => this._learningsService.get())
      );
  }

  onAssignClick(learning: LearningEntry) {
    alert('TODO: assign');
    // const modal = this._modalService.open(UserLearningsModal);
    // const instance = modal.componentInstance as UserLearningsModal;
    // instance.user = user;
  }
}
