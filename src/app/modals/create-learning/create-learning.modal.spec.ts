import { LearningsService } from '@/services/learning/learnings.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateLearningModal } from './create-learning.modal';

describe('CreateLearningModal', () => {
  let component: CreateLearningModal;
  let fixture: ComponentFixture<CreateLearningModal>;
  let modalSpy: jasmine.SpyObj<NgbActiveModal>;
  let learningsService: jasmine.SpyObj<LearningsService>;

  beforeEach(async () => {
    modalSpy = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);
    learningsService = jasmine.createSpyObj('LearningsService', ['getAll']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: NgbActiveModal, useValue: modalSpy },
        { provide: LearningsService, useValue: learningsService },
        FormBuilder,
      ],
      declarations: [CreateLearningModal],
    }).compileComponents();
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
