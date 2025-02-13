export interface AmountEntry {
  id: string;
  amount: string;
}

export interface CurrencyMapping {
  [id: string]: string;
}

export interface Balance {
  id: string;
  amount: number;
  currency: string;
}
