export interface RatesData {
  date: Date;
  currency: string;
  value: string;
}

export interface DateRange {
  dateFrom: Date;
  dateTo: Date;
  currency?: string;
}

export interface RatesDataSet {
  currency: string;
  rates: RatesData[];
}
