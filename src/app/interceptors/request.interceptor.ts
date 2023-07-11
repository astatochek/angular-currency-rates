import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log('Intercepted Request:', request);
    const modifiedRequest = request.clone({
      headers: new HttpHeaders({ apikey: `${localStorage.getItem('apikey')}` }),
    });
    return next.handle(modifiedRequest).pipe(
      catchError((err) => {
        console.log('Got Error', err);
        if (err.status === 401) {
          this.tokenService.status.set('invalid');
        }
        return of(err);
      }),
    );
  }
}
