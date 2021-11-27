import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private _baseUrl: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({ url: `${this._baseUrl}${request.url}` });
    return next.handle(apiReq).pipe(
      catchError((response) => {
        alert(`Unexpected ${response.status} error occurred!`)
        return throwError(response);
      })
    );
  }
}
