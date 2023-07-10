import {Injectable, signal} from '@angular/core';
import {CurrencyInfo, CurrencyList} from "../models/currency";

function generateRandomValues(current: CurrencyInfo): CurrencyInfo {
  return CurrencyList.reduce((acc, currency) => {
    acc[currency] = Math.random() > 0.5 ? {
      prev: current[currency].next,
      next: 75 + 50 * Math.random()
    } : {
      prev: current[currency].next,
      next: current[currency].next
    };
    return acc;
  }, {} as CurrencyInfo)
}

const prev = {
  "quotes": {
    "RUBCNY": 0.079863,
    "RUBEUR": 0.010042,
    "RUBGBP": 0.008584,
    "RUBJPY": 1.56043,
    "RUBTRY": 0.287972,
    "RUBUSD": 0.011044
  },
  "source": "RUB",
  "success": true,
  "timestamp": 1689018423
}

const next = {
  "quotes": {
    "RUBCNY": 0.079863,
    "RUBEUR": 0.010041,
    "RUBGBP": 0.008586,
    "RUBJPY": 1.560597,
    "RUBTRY": 0.287951,
    "RUBUSD": 0.011044
  },
  "source": "RUB",
  "success": true,
  "timestamp": 1689019384
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  date = signal(new Date(Date.now()))

  info = signal<CurrencyInfo>(CurrencyList.reduce((acc, currency) => {
    acc[currency] =  {
      prev: 1 / prev.quotes[`RUB${currency}`],
      next: 1 / next.quotes[`RUB${currency}`]
    };
    return acc;
  }, {} as CurrencyInfo))


  constructor() {
    setInterval(() => {
      this.date.set(new Date(Date.now()))
      this.info.set(generateRandomValues(this.info()))
    }, 5000)
  }


}
