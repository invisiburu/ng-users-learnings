import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersQuery } from '@/services/users/users.query';
import { UsersService } from '@/services/users/users.service';
import { UserEntry } from '@/services/users/users.types';
import { CreateUserModal } from '@/modals/create-user/create-user.modal';

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

  getPage(page = 1) {
    return this._usersService.get({ page }).pipe(first()).subscribe();
  }

  onCreateClick() {
    this._modalService.open(CreateUserModal);
  }

  onDeleteClick(user: UserEntry) {
    alert(`TODO: DELETE!!! ${user.name}`);
  }

  onLearningsClick(user: UserEntry) {
    alert(`TODO: LEARNINGS!!! ${user.name}`);
  }
}
