import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersQuery } from '@/services/users/users.query';
import { UsersService } from '@/services/users/users.service';
import { UserEntry } from '@/services/users/users.types';
import { CreateUserModal } from '@/modals/create-user/create-user.modal';
import { ConfirmModal } from '@/modals/confirm/confirm.modal';
import { UserLearningsModal } from '@/modals/user-learnings/user-learnings.modal';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  users$: Observable<UserEntry[]>;
  usersPage$: Observable<number>;
  usersPerPage$: Observable<number>;
  usersTotal$: Observable<number>;

  constructor(
    private _usersService: UsersService,
    private _usersQuery: UsersQuery,
    private _modalService: NgbModal
  ) {
    this.users$ = this._usersQuery.users$;
    this.usersPage$ = this._usersQuery.usersPage$;
    this.usersPerPage$ = this._usersQuery.usersPerPage$;
    this.usersTotal$ = this._usersQuery.usersTotal$;
  }

  ngOnInit(): void {
    this.getPage();
  }

  userTrackBy(idx: number, item: UserEntry) {
    return item.id;
  }

  getPage(page = 1) {
    return this._usersService.get({ page }).pipe(first()).subscribe();
  }

  onCreateClick() {
    this._modalService.open(CreateUserModal);
  }

  onDeleteClick(user: UserEntry) {
    const modal = this._modalService.open(ConfirmModal);
    const instance = modal.componentInstance as ConfirmModal;
    instance.title = 'Confirm deletion';
    instance.message = `Are you sure you want to delete ${user.name}? This action cannot be undone.`;
    instance.confirmTxt = 'Delete';
    instance.isDanger = true;
    instance.onConfirm = () =>
      this._usersService
        .delete(user.id)
        .pipe(mergeMap(() => this._usersService.get()));
  }

  onLearningsClick(user: UserEntry) {
    const modal = this._modalService.open(UserLearningsModal);
    const instance = modal.componentInstance as UserLearningsModal;
    instance.user = user
  }
}
