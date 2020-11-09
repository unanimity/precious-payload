import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../share/data.service';
import {filter, tap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  currencies: string[] = [];
  dataSource: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    public cdr: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
    this.dataService.ratesData$.pipe(
      filter((r) => r !== []),
      tap((datas) => {
        this.dataSource = [];
        datas.map((data) => {
          data.map((rate) => {
          let tableElement = this.dataSource.find((el) => el.date === rate.date);
          if (tableElement){
            tableElement[rate.currency] = rate.value;
          } else {
            tableElement = {date: rate.date};
            tableElement[rate.currency] = rate.value;
            this.dataSource.push(tableElement);
          }
          });
        });
        this.displayedColumns = this.dataSource.length > 0 ? Object.keys(this.dataSource[0]) : [];
        this.displayedColumns.map((column, i, arr) => {
          let min: any = {marker: {}};
          let max: any = {marker: {}};
          if (i > 0){
            this.dataSource.map((element) => {
              if (parseFloat(element[column]) > parseFloat(max[column]) || ! parseFloat(max[column]) ){
                max = element;
              }
              if (parseFloat(element[column]) < parseFloat(min[column]) || !parseFloat(min[column]) ){
                min = element;
              }
            });
            console.log('---', min, max, column);
            min['marker' + column] = 'green';
            max['marker' + column] = 'red';
          }

        });

        this.cdr.detectChanges();
      })
    ).subscribe();

  }

}
