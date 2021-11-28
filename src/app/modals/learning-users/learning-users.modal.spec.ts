import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { asapScheduler, scheduled } from 'rxjs';
import { LearningsService } from '@/services/learning/learnings.service';
import { UsersService } from '@/services/users/users.service';
import { mockLearningEntry } from '@/test-helpers/mockLearning';

import { LearningUsersModal } from './learning-users.modal';
import { mockUserEntry } from '@/test-helpers/mockUser';

describe('LearningUsersModal', () => {
  let component: LearningUsersModal;
  let fixture: ComponentFixture<LearningUsersModal>;
  let modalSpy: jasmine.SpyObj<NgbActiveModal>;
  let learningsService: jasmine.SpyObj<LearningsService>;
  let usersService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    modalSpy = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);
    learningsService = jasmine.createSpyObj('LearningsService', ['update']);
    usersService = jasmine.createSpyObj('UsersService', ['getAll']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: NgbActiveModal, useValue: modalSpy },
        { provide: LearningsService, useValue: learningsService },
        { provide: UsersService, useValue: usersService },
        FormBuilder,
      ],
      declarations: [LearningUsersModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningUsersModal);
    component = fixture.componentInstance;
    component.learning = mockLearningEntry();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render valid controls', fakeAsync(() => {
    const usersMock = [mockUserEntry(1), mockUserEntry(2)];
    usersService.getAll.and.returnValue(scheduled([usersMock], asapScheduler));
    component.learning.users = [1];

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(
      By.css('.learning-users__user-control input[type=checkbox]')
    );
    expect(component.usersFormArray.length).toEqual(2);
    expect(inputs[0].nativeElement.checked).toEqual(true);
    expect(inputs[1].nativeElement.checked).toEqual(false);
  }));

  it('should dismiss on "Cancel" click', () => {
    fixture.debugElement
      .query(By.css('.learning-users__cancel-btn'))
      .triggerEventHandler('click', null);
    expect(modalSpy.dismiss.calls.count()).toBe(1);
  });
});
