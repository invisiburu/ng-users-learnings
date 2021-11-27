import { UsersService } from '@/services/users/users.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { mergeMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.modal.html',
  styleUrls: ['./create-user.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserModal {
  form = this._fb.group({
    avatar: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private _activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _usersService: UsersService
  ) {}

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this._usersService
      .create({ ...this.form.value, learnings: [] })
      .pipe(
        mergeMap(() => this._usersService.get().pipe(take(1))),
        take(1),
        tap(() => {
          alert('The user created successfully!');
          this._activeModal.dismiss();
        })
      )
      .subscribe();
  }

  onCloseClick() {
    this._activeModal.dismiss();
  }
}
