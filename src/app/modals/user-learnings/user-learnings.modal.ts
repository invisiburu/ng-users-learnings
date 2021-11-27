import { LearningsService } from '@/services/learning/learnings.service';
import { LearningEntry } from '@/services/learning/learnings.types';
import { UserEntry } from '@/services/users/users.types';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-learnings',
  templateUrl: './user-learnings.modal.html',
  styleUrls: ['./user-learnings.modal.scss'],
})
export class UserLearningsModal implements OnInit {
  @Input() user: UserEntry;

  learnings$: Observable<LearningEntry[]>;

  constructor(
    private _activeModal: NgbActiveModal,
    private _learningsService: LearningsService
  ) {}

  ngOnInit() {
    this.learnings$ = this._learningsService.getById(this.user.learnings);
  }

  onCloseClick() {
    this._activeModal.dismiss();
  }
}
