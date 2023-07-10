
export const CurrencyList = ["USD", "EUR", "GBR", "CNY", "JPY", "TRY"] as const
export type Currency = typeof CurrencyList[number]

type FlagDict<Properties extends string> = {
  [key in Properties as `${key}`]: boolean
}

export type CurrencyMask = FlagDict<Currency>


type InfoDict<Properties extends string> = {
  [key in Properties as `${key}`]: {
    prev: number,
    next: number
  }
}

export type CurrencyInfo = InfoDict<Currency>
