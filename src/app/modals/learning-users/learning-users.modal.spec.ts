import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningUsersModal } from './learning-users.modal';

describe('LearningUsersModal', () => {
  let component: LearningUsersModal;
  let fixture: ComponentFixture<LearningUsersModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningUsersModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningUsersModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
