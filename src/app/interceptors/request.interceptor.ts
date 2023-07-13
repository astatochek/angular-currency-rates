import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // console.log('Intercepted Request:', request);
    const modifiedRequest = request.clone({
      headers: new HttpHeaders({ apikey: `${localStorage.getItem('apikey')}` }),
    });
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) {
            this.tokenService.status.set('valid');
          }
        }
      }),
      catchError((err) => {
        // console.log('Got Error', err);
        if (err.status === 401 || err.status === 429) {
          this.tokenService.status.set('invalid');
        }
        return of(err);
      }),
    );
  }
}
