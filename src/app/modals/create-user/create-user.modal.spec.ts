import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserModal } from './create-user.modal';

describe('CreateUserModal', () => {
  let component: CreateUserModal;
  let fixture: ComponentFixture<CreateUserModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserModal ]
    })
    .compileComponents();
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
