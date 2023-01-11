import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { DiagramComponent } from './components/diagram/diagram.component';


@NgModule({
  declarations: [
    StatisticPageComponent,
    DiagramComponent
  ],
  imports: [
    CommonModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
