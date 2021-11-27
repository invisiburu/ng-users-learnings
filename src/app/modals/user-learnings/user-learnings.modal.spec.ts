import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLearningsModal } from './user-learnings.modal';

describe('UserLearningsModal', () => {
  let component: UserLearningsModal;
  let fixture: ComponentFixture<UserLearningsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLearningsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLearningsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
