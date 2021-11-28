import { UsersService } from '@/services/users/users.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateUserModal } from './create-user.modal';

describe('CreateUserModal', () => {
  let component: CreateUserModal;
  let fixture: ComponentFixture<CreateUserModal>;
  let modalSpy: jasmine.SpyObj<NgbActiveModal>;
  let usersService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    usersService = jasmine.createSpyObj('UsersService', ['getAll']);
    modalSpy = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: NgbActiveModal, useValue: modalSpy },
        { provide: UsersService, useValue: usersService },
        FormBuilder,
      ],
      declarations: [CreateUserModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
