import {Currency, SourceCurrency} from "./currency";

type QuotesDict<Properties extends string> = {
  [key in Properties as `${SourceCurrency}${key}`]: number
}

export type ApiResponse = {
  success: boolean,
  timestamp: number,
  source: SourceCurrency,
  quotes: QuotesDict<Currency>
}
