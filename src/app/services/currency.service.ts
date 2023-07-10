import {Injectable, signal} from '@angular/core';
import {CurrencyInfo, CurrencyList} from "../models/currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  date = signal(new Date(Date.now()))

  info = signal<CurrencyInfo>(CurrencyList.reduce((acc, currency) => {
    acc[currency] = { prev: 50 + 50 * Math.random(), next: 50 + 50 * Math.random() };
    return acc;
  }, {} as CurrencyInfo))


  constructor() {
    setInterval(() => this.date.set(new Date(Date.now())), 1000)
  }
}
