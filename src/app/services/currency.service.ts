import { computed, inject, Injectable } from '@angular/core';
import { CurrencyInfo, CurrencyList } from '../models/currency';
import { ApiResponse } from '../models/api.response';
import { ApiService } from './api.service';
import { _prev, _next } from '../dummies/data';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private api = inject(ApiService);

  date = computed(() => {
    console.log(this.api.response());
    return new Date(Date.now());
  });

  private prevResponseSnapshot: ApiResponse = _prev;

  info = computed<CurrencyInfo>(() => {
    const response = this.api.response();
    const next = response === undefined ? _next : response;
    const prev = this.prevResponseSnapshot;
    const res = CurrencyList.reduce((acc, currency) => {
      acc[currency] = {
        prev: 1 / prev.quotes[`${prev.source}${currency}`],
        next: 1 / next.quotes[`${prev.source}${currency}`],
      };
      return acc;
    }, {} as CurrencyInfo);
    this.prevResponseSnapshot = next;
    return res;
  });
}
