import { Currency, SourceCurrency } from './currency';

type QuotesDict<Properties extends string> = {
  [key in Properties as `${typeof SourceCurrency}${key}`]: number;
};

export type ApiResponse = {
  success: boolean;
  timestamp: number;
  source: typeof SourceCurrency;
  quotes: QuotesDict<Currency>;
};
