import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { RequestInterceptor } from './request.interceptor';

class MockHttpHandler implements HttpHandler {
  handle(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    return of(new HttpResponse());
  }
}

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RequestInterceptor,
        TokenService,
        { provide: HttpHandler, useClass: MockHttpHandler },
      ],
    });
    interceptor = TestBed.inject(RequestInterceptor);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should set token status to "valid" for successful response', () => {
    const request = new HttpRequest('GET', '/api');
    spyOn(tokenService.status, 'set');

    interceptor.intercept(request, new MockHttpHandler()).subscribe(() => {});

    expect(tokenService.status.set).toHaveBeenCalledWith('valid');
  });

  it('should set token status to "invalid" for 401 error', () => {
    const request = new HttpRequest('GET', '/api');
    const errorResponse = new HttpErrorResponse({ status: 401 });

    interceptor
      .intercept(request, {
        handle: () => throwError(() => errorResponse),
      } as HttpHandler)
      .subscribe();

    expect(tokenService.status()).toEqual('invalid');
  });

  it('should set token status to "invalid" for 429 error', () => {
    const request = new HttpRequest('GET', '/api');
    const errorResponse = new HttpErrorResponse({ status: 429 });

    interceptor
      .intercept(request, {
        handle: () => throwError(() => errorResponse),
      } as HttpHandler)
      .subscribe();

    expect(tokenService.status()).toEqual('invalid');
  });

  it('should log error when catchError is triggered', () => {
    const request = new HttpRequest('GET', '/api');
    const errorResponse = new HttpErrorResponse({ status: 500 });
    spyOn(console, 'log');

    interceptor
      .intercept(request, {
        handle: () => throwError(() => errorResponse),
      } as HttpHandler)
      .subscribe();

    expect(console.log).toHaveBeenCalledWith('Got Error', errorResponse);
  });
});
