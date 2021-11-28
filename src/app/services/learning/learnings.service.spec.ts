import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs/operators';

import { LearningsService } from './learnings.service';
import { LearningsStore } from './learnings.store';
import { mockLearningEntry } from '@/test-helpers/mockLearning';

describe('LearningsService', () => {
  let learningsService: LearningsService;
  let learningsStore: LearningsStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LearningsService],
    });
    learningsService = TestBed.inject(LearningsService);
    learningsStore = TestBed.inject(LearningsStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(learningsService).toBeTruthy();
  });

  describe('performs get()', () => {
    describe('with valid params', () => {
      it('should use default pagination params', () => {
        const responseMock = [mockLearningEntry()];

        learningsService
          .get()
          .pipe(first())
          .subscribe((data) => expect(data).toEqual(responseMock));

        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.url).toEqual('/learnings');
        expect(req.request.params.get('_page')).toEqual('1');
        expect(req.request.params.get('_limit')).toEqual('10');
        req.flush(responseMock);
        httpMock.verify();
      });

      it('should use previous pagination params', () => {
        const responseMock = [mockLearningEntry()];
        learningsStore.update({ page: 42, perPage: 33 });

        learningsService
          .get()
          .pipe(first())
          .subscribe((data) => expect(data).toEqual(responseMock));

        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.url).toEqual('/learnings');
        expect(req.request.params.get('_page')).toEqual('42');
        expect(req.request.params.get('_limit')).toEqual('33');
        req.flush(responseMock);
        httpMock.verify();
      });

      it('should use specified pagination params', () => {
        const responseMock = [mockLearningEntry()];
        learningsStore.update({ page: 42, perPage: 33 });

        learningsService
          .get({ page: 96, limit: 7 })
          .pipe(first())
          .subscribe((data) => expect(data).toEqual(responseMock));

        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.url).toEqual('/learnings');
        expect(req.request.params.get('_page')).toEqual('96');
        expect(req.request.params.get('_limit')).toEqual('7');
        req.flush(responseMock);
        httpMock.verify();
      });
    });

    it('should save the response to the store', () => {
      const responseMock = [mockLearningEntry()];
      const newPage = 2;
      const newPerPage = 7;
      const newTotal = 100;
      learningsStore.update({ learnings: null, page: 0, perPage: 0, total: 0 });

      learningsService
        .get({ page: newPage, limit: newPerPage })
        .pipe(first())
        .subscribe((data) => {
          expect(learningsStore.getValue()).toEqual({
            learnings: responseMock,
            page: newPage,
            perPage: newPerPage,
            total: newTotal,
          });
          expect(data).toEqual(responseMock);
        });

      const req = httpMock.expectOne({ method: 'GET' });
      expect(req.request.url).toEqual('/learnings');
      req.flush(responseMock, {
        headers: { 'X-Total-Count': String(newTotal) },
      });
      httpMock.verify();
    });
  });

  describe('performs getById() correctly', () => {
    it('should accept a single id', () => {
      const responseMock = [mockLearningEntry()];

      learningsService
        .getById(responseMock[0].id)
        .pipe(first())
        .subscribe((data) => expect(data).toEqual(responseMock));

      const req = httpMock.expectOne({
        url: `/learnings?id=${responseMock[0].id}`,
        method: 'GET',
      });
      req.flush(responseMock);
      httpMock.verify();
    });

    it('should accept multiple ids', () => {
      const responseMock = [mockLearningEntry(1), mockLearningEntry(2)];

      learningsService
        .getById([responseMock[0].id, responseMock[1].id])
        .pipe(first())
        .subscribe((data) => expect(data).toEqual(responseMock));

      const req = httpMock.expectOne({
        url: `/learnings?id=${responseMock[0].id}&id=${responseMock[1].id}`,
        method: 'GET',
      });
      req.flush(responseMock);
      httpMock.verify();
    });
  });

  it('should perform create() correctly', () => {
    const learningMock = mockLearningEntry();
    const { id: learningMockId, ...learningMockBody } = learningMock;

    learningsService
      .create(learningMockBody)
      .pipe(first())
      .subscribe((data) => expect(data).toEqual(learningMock));

    const req = httpMock.expectOne({ url: '/learnings', method: 'POST' });
    req.flush(learningMock);
    httpMock.verify();
  });

  it('should perform update() correctly', () => {
    const learningMock = mockLearningEntry();
    const { id: learningMockId, ...learningMockBody } = learningMock;

    learningsService
      .update(learningMockId, learningMockBody)
      .pipe(first())
      .subscribe((data) => expect(data).toEqual(learningMock));

    const req = httpMock.expectOne({
      url: `/learnings/${learningMockId}`,
      method: 'PATCH',
    });
    expect(req.request.body).toEqual(learningMockBody);
    req.flush(learningMock);
    httpMock.verify();
  });

  it('should perform delete() correctly', () => {
    learningsService
      .delete(1)
      .pipe(first())
      .subscribe((data) => expect(data).toEqual({}));

    const req = httpMock.expectOne({
      url: `/learnings/${1}`,
      method: 'DELETE',
    });
    req.flush({});
    httpMock.verify();
  });
});
