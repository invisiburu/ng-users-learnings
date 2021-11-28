import { LearningsService } from '@/services/learning/learnings.service';
import { LearningEntry } from '@/services/learning/learnings.types';
import { UsersService } from '@/services/users/users.service';
import { UserEntry } from '@/services/users/users.types';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { asapScheduler, BehaviorSubject, scheduled } from 'rxjs';
import { first, mergeAll, tap } from 'rxjs/operators';

@Component({
  selector: 'app-learning-users',
  templateUrl: './learning-users.modal.html',
  styleUrls: ['./learning-users.modal.scss'],
})
export class LearningUsersModal implements OnInit {
  @Input() learning: LearningEntry;

  users$ = new BehaviorSubject<UserEntry[]>([]);

  form = this._fb.group({
    users: this._fb.array([]),
  });

  constructor(
    private _activeModal: NgbActiveModal,
    private _learningsService: LearningsService,
    private _usersService: UsersService,
    private _fb: FormBuilder
  ) {}

  get usersFormArray() {
    return this.form.get('users') as FormArray;
  }

  ngOnInit() {
    this._loadUserControlGroups();
  }

  async onSaveClick() {
    await this._updateLearning().toPromise();
    await this._updateUsers().toPromise();
    await this._learningsService.get().toPromise();
    alert('Learning assignments updated');
    this._activeModal.dismiss();
  }

  onCloseClick() {
    this._activeModal.dismiss();
  }

  private _loadUserControlGroups() {
    const obs$ = this._usersService.getAll().pipe(
      first(),
      tap((users) => {
        users.forEach((user) => {
          const isIncluded = this.learning.users.includes(user.id);
          this.usersFormArray.push(this._fb.control(isIncluded));
        });
      })
    );
    obs$.subscribe(this.users$);
  }

  private _updateLearning() {
    const users = this.usersFormArray.controls
      .map((el, idx) => (el.value === true ? this.users$.value[idx] : null))
      .filter((el) => el !== null);
    return this._learningsService.update(this.learning.id, {
      users: users.map((user) => user.id),
    });
  }

  // NOTE: normally you would update one of the resources which will create
  // a relation between them, but since we mock data I simply sync both
  // sources
  private _updateUsers() {
    const addObs = this.usersFormArray.controls
      .map((el, idx) => {
        const user = this.users$.value[idx];
        if (el.value === true && !this.learning.users.includes(user.id)) {
          return this._usersService.update(user.id, {
            learnings: user.learnings.concat(this.learning.id),
          });
        }
        return null;
      })
      .filter((el) => el !== null);

    const removeObs = this.usersFormArray.controls
      .map((el, idx) => {
        const user = this.users$.value[idx];
        if (el.value === false && this.learning.users.includes(user.id)) {
          return this._usersService.update(user.id, {
            learnings: user.learnings.filter((id) => id !== this.learning.id),
          });
        }
        return null;
      })
      .filter((el) => el !== null);

    return scheduled([...addObs, ...removeObs], asapScheduler).pipe(mergeAll());
  }
}
