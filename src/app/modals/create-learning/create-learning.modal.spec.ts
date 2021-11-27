import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLearningModal } from './create-learning.modal';

describe('CreateLearningModal', () => {
  let component: CreateLearningModal;
  let fixture: ComponentFixture<CreateLearningModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLearningModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLearningModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
