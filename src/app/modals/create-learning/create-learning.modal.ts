import { LearningsService } from '@/services/learning/learnings.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { mergeMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-learning',
  templateUrl: './create-learning.modal.html',
  styleUrls: ['./create-learning.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLearningModal {
  form = this._fb.group({
    name: ['', Validators.required],
    active: [true, Validators.required],
  });

  constructor(
    private _activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _learningsService: LearningsService
  ) {}

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this._learningsService
      .create({
        name: this.form.value.name,
        is_active: this.form.value.active,
        users: [],
      })
      .pipe(
        mergeMap(() => this._learningsService.get().pipe(take(1))),
        take(1),
        tap(() => {
          alert('The learning created successfully!');
          this._activeModal.dismiss();
        })
      )
      .subscribe();
  }

  onCloseClick() {
    this._activeModal.dismiss();
  }
}
