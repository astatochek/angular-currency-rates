import { Currency, SourceCurrency } from './currency';

type QuotesDict<Properties extends string> = {
  [key in Properties as `${typeof SourceCurrency}${key}`]: number;
};

/**
 * Defined in https://apilayer.com/marketplace/currency_data-api#endpoints for /live endpoint
 */
export type ApiResponse = {
  success: boolean;
  timestamp: number;
  source: typeof SourceCurrency;
  quotes: QuotesDict<Currency>;
};
