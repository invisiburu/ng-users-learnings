import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { asapScheduler, scheduled } from 'rxjs';
import { LearningsService } from '@/services/learning/learnings.service';

import { UserLearningsModal } from './user-learnings.modal';
import { mockUserEntry } from '@/test-helpers/mockUser';
import { mockLearningEntry } from '@/test-helpers/mockLearning';

describe('UserLearningsModal', () => {
  let component: UserLearningsModal;
  let fixture: ComponentFixture<UserLearningsModal>;
  let modalSpy: jasmine.SpyObj<NgbActiveModal>;
  let learningsService: jasmine.SpyObj<LearningsService>;

  beforeEach(async () => {
    modalSpy = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);
    learningsService = jasmine.createSpyObj('LearningsService', ['getById']);
    await TestBed.configureTestingModule({
      providers: [
        { provide: NgbActiveModal, useValue: modalSpy },
        { provide: LearningsService, useValue: learningsService },
      ],
      declarations: [UserLearningsModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLearningsModal);
    component = fixture.componentInstance;
    component.user = mockUserEntry();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should request learnings on init', () => {
    component.user.learnings = [1, 2];
    fixture.detectChanges();
    expect(learningsService.getById.calls.count()).toEqual(1);
    expect(learningsService.getById.calls.first().args[0]).toEqual([1, 2]);
  });

  it('should render user name correctly', () => {
    component.user.name = 'Bob Marley';

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.user-learnings__heading'))
        .nativeElement.textContent
    ).toContain('Bob Marley');
  });

  it('should render learnings correctly', fakeAsync(() => {
    const learningsMock = [mockLearningEntry(1), mockLearningEntry(2, false)];
    learningsService.getById.and.returnValues(
      scheduled([learningsMock], asapScheduler)
    );

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const items = fixture.debugElement
      .queryAll(By.css('.user-learnings__item'))
      .slice(1);
    expect(items.length).toEqual(2);
    expect(
      items.every((item, itemIdx) => {
        const cells = item.queryAll(By.css('.user-learnings__item-cell'));
        const name = cells[0].nativeElement.textContent.trim();
        const isArchive = cells[1].nativeElement.textContent.trim();
        return (
          name === learningsMock[itemIdx].name &&
          isArchive === String(!learningsMock[itemIdx].is_active)
        );
      })
    ).toEqual(true);
  }));

  it('should dismiss on "Cancel" click', () => {
    fixture.debugElement
      .query(By.css('.user-learnings__close-btn'))
      .triggerEventHandler('click', null);
    expect(modalSpy.dismiss.calls.count()).toBe(1);
  });
});
