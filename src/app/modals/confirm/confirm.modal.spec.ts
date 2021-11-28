import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { asapScheduler, scheduled } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ConfirmModal } from './confirm.modal';

describe('ConfirmModal', () => {
  let component: ConfirmModal;
  let fixture: ComponentFixture<ConfirmModal>;
  let modalSpy: jasmine.SpyObj<NgbActiveModal>;

  beforeEach(async () => {
    modalSpy = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);
    await TestBed.configureTestingModule({
      providers: [{ provide: NgbActiveModal, useValue: modalSpy }],
      declarations: [ConfirmModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('renders valid texts', () => {
    it('should render default texts', () => {
      expect(
        fixture.debugElement
          .query(By.css('.confirm__title'))
          .nativeElement.textContent.trim()
      ).toEqual('Confirm action');

      expect(
        fixture.debugElement
          .query(By.css('.confirm__text'))
          .nativeElement.textContent.trim()
      ).toEqual('Are you sure you want to perform this action?');

      expect(
        fixture.debugElement
          .query(By.css('.confirm__confirm-btn'))
          .nativeElement.textContent.trim()
      ).toEqual('Confirm');

      expect(
        fixture.debugElement.query(By.css('.confirm__confirm-btn'))
          .nativeElement
      ).toHaveClass('btn-primary');

      expect(
        fixture.debugElement
          .query(By.css('.confirm__cancel-btn'))
          .nativeElement.textContent.trim()
      ).toEqual('Cancel');
    });

    it('should render provided texts', () => {
      component.title = 'Custom title';
      component.message = 'Custom message';
      component.confirmTxt = 'Custom confirm';
      component.cancelTxt = 'Custom cancel';
      component.isDanger = true;
      fixture.detectChanges();

      expect(
        fixture.debugElement
          .query(By.css('.confirm__title'))
          .nativeElement.textContent.trim()
      ).toEqual('Custom title');

      expect(
        fixture.debugElement
          .query(By.css('.confirm__text'))
          .nativeElement.textContent.trim()
      ).toEqual('Custom message');

      expect(
        fixture.debugElement
          .query(By.css('.confirm__confirm-btn'))
          .nativeElement.textContent.trim()
      ).toEqual('Custom confirm');

      expect(
        fixture.debugElement.query(By.css('.confirm__confirm-btn'))
          .nativeElement
      ).toHaveClass('btn-danger');

      expect(
        fixture.debugElement
          .query(By.css('.confirm__cancel-btn'))
          .nativeElement.textContent.trim()
      ).toEqual('Custom cancel');
    });
  });

  it('should trigger the confirm observer on "Confirm" click', (done) => {
    component.onConfirm = () =>
      scheduled([1], asapScheduler).pipe(
        finalize(() => {
          expect(modalSpy.dismiss.calls.count()).toBe(1);
          done();
        })
      );

    fixture.debugElement
      .query(By.css('.confirm__confirm-btn'))
      .triggerEventHandler('click', null);
  });

  it('should dismiss on "Cancel" click', () => {
    fixture.debugElement
      .query(By.css('.confirm__cancel-btn'))
      .triggerEventHandler('click', null);
    expect(modalSpy.dismiss.calls.count()).toBe(1);
  });
});
