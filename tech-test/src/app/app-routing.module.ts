import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteNames } from '@common/constants/route-names';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: RouteNames.STATISTIC,
    loadChildren: () => import('./modules/statistic/statistic.module').then(m => m.StatisticModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
