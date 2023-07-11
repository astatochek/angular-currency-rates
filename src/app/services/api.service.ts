import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrencyList } from '../models/currency';
import { ApiResponse } from '../models/apiResponse';
import { interval, Observable, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private requests$ = interval(5000).pipe(switchMap(() => this.sendRequest()));

  response = toSignal(this.requests$);

  private sendRequest() {
    if (this.tokenService.status() === 'invalid') {
      return new Observable<ApiResponse>();
    }

    const params = new HttpParams()
      .append('source', 'RUB')
      .append('currencies', CurrencyList.join());

    return this.http.get<ApiResponse>(
      'https://api.apilayer.com/currency_data/live',
      {
        params: params,
      },
    );

    // function withNoise(val: number) {
    //   if (Math.random() < 0.33) return val
    //   const actual = 1 / val
    //   return 1 / (actual + Math.random() * actual / 50 * ((Math.random() > 0.5) ? -1 : 1))
    // }
    //
    // return new Observable<ApiResponse>(subscriber => {
    //   subscriber.next({
    //     success: true,
    //     timestamp: 0,
    //     source: "RUB",
    //     quotes: {
    //       "RUBCNY": withNoise(0.079863),
    //       "RUBEUR": withNoise(0.010042),
    //       "RUBGBP": withNoise(0.008584),
    //       "RUBJPY": withNoise(1.56043),
    //       "RUBTRY": withNoise(0.287972),
    //       "RUBUSD": withNoise(0.011044)
    //     }
    //   })
    // })
  }
}