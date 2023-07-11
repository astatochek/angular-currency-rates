import { computed, inject, Injectable } from '@angular/core';
import { CurrencyInfo, CurrencyList } from '../models/currency';
import { ApiResponse } from '../models/apiResponse';
import { ApiService } from './api.service';

const _prev: ApiResponse = {
  quotes: {
    RUBCNY: 0.079863,
    RUBEUR: 0.010042,
    RUBGBP: 0.008584,
    RUBJPY: 1.56043,
    RUBTRY: 0.287972,
    RUBUSD: 0.011044,
  },
  source: 'RUB',
  success: true,
  timestamp: 1689018423,
};

const _next: ApiResponse = {
  quotes: {
    RUBCNY: 0.079863,
    RUBEUR: 0.010041,
    RUBGBP: 0.008586,
    RUBJPY: 1.560597,
    RUBTRY: 0.287951,
    RUBUSD: 0.011044,
  },
  source: 'RUB',
  success: true,
  timestamp: 1689019384,
};

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
