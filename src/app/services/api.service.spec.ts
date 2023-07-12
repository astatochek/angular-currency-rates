import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { _prev } from '../dummies/data';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurrencyList, SourceCurrency } from '../models/currency';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let url = `https://api.apilayer.com/currency_data/live?source=${SourceCurrency}&currencies=${CurrencyList.join()}`;
  let mockApiResponse = _prev;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a request and return response', () => {
    service.sendRequest().subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });
});
