import { PageHeadComponent } from '@/components/page-head/page-head.component';
import { LearningsService } from '@/services/learning/learnings.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LearningsListComponent } from './learnings-list.component';

describe('LearningsListComponent', () => {
  let component: LearningsListComponent;
  let fixture: ComponentFixture<LearningsListComponent>;
  let learningsService: jasmine.SpyObj<LearningsService>;

  beforeEach(async () => {
    learningsService = jasmine.createSpyObj('LearningsService', ['get']);
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      providers: [{ provide: LearningsService, useValue: learningsService }],
      declarations: [PageHeadComponent, LearningsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsListComponent);
    component = fixture.componentInstance;
    component.getPage = jasmine.createSpy('getPage');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
