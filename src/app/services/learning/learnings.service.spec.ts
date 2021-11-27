import { TestBed } from '@angular/core/testing';

import { LearningsService } from './learnings.service';

describe('LearningsService', () => {
  let service: LearningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
