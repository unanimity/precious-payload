import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from '../share/data.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  customRange = false;
  private dateTo: any;
  private dateFrom: any;
  inProcess = true;

  constructor(
    private dataService: DataService,
    public cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.dataService.ratesData$.pipe(
      tap(() => {
        this.inProcess = false;
        this.cdr.detectChanges();
      })
    ).subscribe();
    this.dataService.dateRange$.pipe(
      tap(() => {
        this.inProcess = true;
        this.cdr.detectChanges();
        }
      )
    ).subscribe();
    this.setRangeMonth();
  }

  setRangeMonth() {
    this.customRange = false;
    this.dataService.dateRange$.next(
      {
        dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        dateTo: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      });
  }

  setRangeYear() {
    this.customRange = false;
    this.dataService.dateRange$.next(
      {
        dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        dateTo: new Date(new Date().getFullYear() + 1, new Date().getMonth() , 0)
      });
  }

  setRangeCustom() {
    this.customRange = !this.customRange;
  }


  onSetDateFrom($event: MatDatepickerInputEvent<unknown, unknown>) {
    this.dateFrom = $event.value;
    if (this.dateFrom && this.dateTo) {
      this.dataService.dateRange$.next(
        {
          dateFrom: new Date (this.dateFrom),
          dateTo: new Date (this.dateTo)
        });
    }
  }
  onSetDateTo($event: MatDatepickerInputEvent<unknown, unknown>) {
    this.dateTo = $event.value;
    if (this.dateFrom && this.dateTo) {
      this.dataService.dateRange$.next(
        {
          dateFrom: new Date (this.dateFrom),
          dateTo: new Date (this.dateTo)
        });
    }
  }

}
