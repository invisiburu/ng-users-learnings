import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.modal.html',
  styleUrls: ['./confirm.modal.scss'],
})
export class ConfirmModal {
  @Input() title: string;
  @Input() message: string;
  @Input() confirmTxt: string;
  @Input() cancelTxt: string;
  @Input() isDanger: boolean;
  @Input() onConfirm: () => Observable<unknown>;

  constructor(private _activeModal: NgbActiveModal) {}

  onConfirmClick() {
    this.onConfirm()
      .pipe(tap(() => this._activeModal.dismiss()))
      .subscribe();
  }

  onCloseClick() {
    this._activeModal.dismiss();
  }
}
