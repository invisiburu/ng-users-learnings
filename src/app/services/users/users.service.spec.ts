import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { first } from 'rxjs/operators';

import { UsersService } from './users.service';
import { UsersStore } from './users.store';
import { mockUserEntry } from '@/test-helpers/mockUser';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersStore: UsersStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    usersService = TestBed.inject(UsersService);
    usersStore = TestBed.inject(UsersStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  describe('performs get()', () => {
    describe('with valid params', () => {
      it('should use default pagination params', () => {
        const responseMock = [mockUserEntry()];

        usersService
          .get()
          .pipe(first())
          .subscribe((data) => expect(data).toEqual(responseMock));

        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.url).toEqual('/users');
        expect(req.request.params.get('_page')).toEqual('1');
        expect(req.request.params.get('_limit')).toEqual('10');
        req.flush(responseMock);
        httpMock.verify();
      });

      it('should use previous pagination params', () => {
        const responseMock = [mockUserEntry()];
        usersStore.update({ page: 42, perPage: 33 });

        usersService
          .get()
          .pipe(first())
          .subscribe((data) => expect(data).toEqual(responseMock));

        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.url).toEqual('/users');
        expect(req.request.params.get('_page')).toEqual('42');
        expect(req.request.params.get('_limit')).toEqual('33');
        req.flush(responseMock);
        httpMock.verify();
      });

      it('should use specified pagination params', () => {
        const responseMock = [mockUserEntry()];
        usersStore.update({ page: 42, perPage: 33 });

        usersService
          .get({ page: 96, limit: 7 })
          .pipe(first())
          .subscribe((data) => expect(data).toEqual(responseMock));

        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.url).toEqual('/users');
        expect(req.request.params.get('_page')).toEqual('96');
        expect(req.request.params.get('_limit')).toEqual('7');
        req.flush(responseMock);
        httpMock.verify();
      });
    });

    it('should save the response to the store', () => {
      const responseMock = [mockUserEntry()];
      const newPage = 2;
      const newPerPage = 7;
      const newTotal = 100;
      usersStore.update({ users: null, page: 0, perPage: 0, total: 0 });

      usersService
        .get({ page: newPage, limit: newPerPage })
        .pipe(first())
        .subscribe((data) => {
          expect(usersStore.getValue()).toEqual({
            users: responseMock,
            page: newPage,
            perPage: newPerPage,
            total: newTotal,
          });
          expect(data).toEqual(responseMock);
        });

      const req = httpMock.expectOne({ method: 'GET' });
      expect(req.request.url).toEqual('/users');
      req.flush(responseMock, {
        headers: { 'X-Total-Count': String(newTotal) },
      });
      httpMock.verify();
    });
  });

  it('should perform getAll() correctly', () => {
    const responseMock = [mockUserEntry()];

    usersService
      .getAll()
      .pipe(first())
      .subscribe((data) => expect(data).toEqual(responseMock));

    const req = httpMock.expectOne({ url: '/users', method: 'GET' });
    req.flush(responseMock);
    httpMock.verify();
  });

  it('should perform create() correctly', () => {
    const userMock = mockUserEntry();
    const { id: userMockId, ...userMockBody } = userMock;

    usersService
      .create(userMockBody)
      .pipe(first())
      .subscribe((data) => expect(data).toEqual(userMock));

    const req = httpMock.expectOne({ url: '/users', method: 'POST' });
    req.flush(userMock);
    httpMock.verify();
  });

  it('should perform update() correctly', () => {
    const userMock = mockUserEntry();
    const { id: userMockId, ...userMockBody } = userMock;

    usersService
      .update(userMockId, userMockBody)
      .pipe(first())
      .subscribe((data) => expect(data).toEqual(userMock));

    const req = httpMock.expectOne({
      url: `/users/${userMockId}`,
      method: 'PATCH',
    });
    expect(req.request.body).toEqual(userMockBody);
    req.flush(userMock);
    httpMock.verify();
  });

  it('should perform delete() correctly', () => {
    usersService
      .delete(1)
      .pipe(first())
      .subscribe((data) => expect(data).toEqual({}));

    const req = httpMock.expectOne({
      url: `/users/${1}`,
      method: 'DELETE',
    });
    req.flush({});
    httpMock.verify();
  });
});
