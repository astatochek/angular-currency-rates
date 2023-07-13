import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrencyList, SourceCurrency } from '../models/currency';
import { ApiResponse } from '../models/api.response';
import {
  interval,
  switchMap,
  merge,
  Subject,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
/**
 * Manages sending requests on schedule and on demand
 */
export class ApiService {
  private http = inject(HttpClient);

  private formValueSubject = new Subject<string>();
  formValueChangesResponse$ = this.formValueSubject.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(() => this.sendRequest()),
  );

  /**
   * Passes new value to the service's stream associated with the form for token input
   * @param value new token that passed form validation
   */
  emitFormValue(value: string) {
    this.formValueSubject.next(value);
  }

  private requests$ = interval(5000).pipe(switchMap(() => this.sendRequest()));

  response = toSignal(merge(this.requests$, this.formValueChangesResponse$));

  /**
   * Sends a request to https://api.apilayer.com/currency_data/live
   */
  sendRequest() {
    const params = new HttpParams()
      .append('source', SourceCurrency)
      .append('currencies', CurrencyList.join());

    return this.http.get<ApiResponse>(
      'https://api.apilayer.com/currency_data/live',
      {
        params: params,
      },
    );
  }
}
