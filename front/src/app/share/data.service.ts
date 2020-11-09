import { Injectable } from '@angular/core';
import {forkJoin, ReplaySubject} from 'rxjs';
import { defaultIfEmpty, tap } from 'rxjs/operators';
import {DateRange, RatesData, RatesDataSet} from './interfaces';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'any'
})
export class DataService {

  public ratesData$ = new ReplaySubject<RatesData[][]>();
  public dateRange$ = new ReplaySubject<DateRange>();
  public currencies = ['USD', 'EUR'];

  constructor(
    private api: ApiService
  ) {
    this.dateRange$.pipe(
      defaultIfEmpty({
        dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        dateTo: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      } as DateRange),
      tap((range) => {
        const newData: RatesDataSet[] = [];
        const apiResponses$ = [];
        this.currencies.map((currency) => {
          range.currency = currency;
          apiResponses$.push(
          this.api.getData(range));
        });
        forkJoin(apiResponses$).subscribe((results: RatesData[][] ) => {
          this.ratesData$.next(results);
        });
        }
      )
    ).subscribe();
  //  this.dateRange$.next(null);
  }

}
