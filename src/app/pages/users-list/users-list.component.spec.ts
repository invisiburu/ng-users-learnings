import { PageHeadComponent } from '@/components/page-head/page-head.component';
import { UsersService } from '@/services/users/users.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    usersService = jasmine.createSpyObj('UsersService', ['get']);
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      providers: [{ provide: UsersService, useValue: usersService }],
      declarations: [PageHeadComponent, UsersListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    component.getPage = jasmine.createSpy('getPage');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
