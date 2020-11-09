import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GraphComponent } from './graph/graph.component';
import { TableComponent } from './table/table.component';
import { ChartsModule } from 'ng2-charts';
import { SettingsComponent } from './settings/settings.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphComponent,
    TableComponent,
    SettingsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ChartsModule,
        MatGridListModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatNativeDateModule,
        HttpClientModule,
        MatProgressBarModule,
        MatCardModule,
        MatPaginatorModule
    ],
  providers: [
    HttpClientModule,
  {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
