import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DateRange } from './interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getData(range: DateRange): Observable<any>{
    return this.http.get(
      this.url + `/rate?currency=${range.currency}&date_from=${range.dateFrom.toISOString().substring(0, 10)}&date_to=${
        range.dateTo.toISOString().substring(0, 10)}`);
  }
}
