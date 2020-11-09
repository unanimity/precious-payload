import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Label, ThemeService} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {DataService} from '../share/data.service';
import {filter, tap} from 'rxjs/operators';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];

  constructor(
    private dataService: DataService,
    public cdr: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.dataService.ratesData$.pipe(
      filter((r) => r !== []),
      tap((datas) => {
        this.barChartData = [];
        this.barChartLabels = [];
        datas.map((data) => {
          data.map((rate) => {
            let barChartDataElement = this.barChartData.find((el) => el.label === rate.currency);
            if (barChartDataElement){
              barChartDataElement.data.push(parseFloat(rate.value));
              console.log('PF',parseFloat(rate.value))
            } else {
              barChartDataElement = {label: rate.currency, data: [parseFloat(rate.value)]};
              this.barChartData.push(barChartDataElement);
            }
            const date = rate.date ;
            if (!this.barChartLabels.find((aDate) => aDate === date.toString())) {
            this.barChartLabels.push(date.toString());
            }
          });
        });
        this.cdr.detectChanges();
      })
    ).subscribe();
  }



}
