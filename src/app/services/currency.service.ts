import {Injectable, signal} from '@angular/core';
import {CurrencyInfo, CurrencyList} from "../models/currency";

function generateRandomValues(): CurrencyInfo {
  return CurrencyList.reduce((acc, currency) => {
    acc[currency] = Math.random() > 0.5 ? { prev: 100 + 50 * Math.random(), next: 75 + 50 * Math.random() } : { prev: 85.23, next: 85.23 };
    return acc;
  }, {} as CurrencyInfo)
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  date = signal(new Date(Date.now()))

  info = signal<CurrencyInfo>(CurrencyList.reduce((acc, currency) => {
    acc[currency] =  { prev: 100 + 50 * Math.random(), next: 75 + 50 * Math.random() };
    return acc;
  }, {} as CurrencyInfo))


  constructor() {
    setInterval(() => {
      this.date.set(new Date(Date.now()))
      this.info.set(generateRandomValues())
    }, 1000)
  }


}
