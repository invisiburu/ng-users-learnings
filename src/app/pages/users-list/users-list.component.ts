import { UsersQuery } from '@/services/users/users.query';
import { UsersService } from '@/services/users/users.service';
import { UserEntry } from '@/services/users/users.types';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  users$: Observable<UserEntry[]>;

  constructor(
    private _usersService: UsersService,
    private _usersQuery: UsersQuery
  ) {
    this.users$ = this._usersQuery.users$;
  }

  ngOnInit(): void {
    this._usersService
      .getAll()
      .pipe(first())
      .subscribe((n) => {
        console.log(n);
        console.log(this._usersQuery.users$);
      });
  }

  onDeleteClick(user: UserEntry) {
    alert(`TODO: DELETE!!! ${user.name}`);
  }

  onLearningsClick(user: UserEntry) {
    alert(`TODO: LEARNINGS!!! ${user.name}`);
  }
}
