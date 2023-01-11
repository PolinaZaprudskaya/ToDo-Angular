import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteNames } from '@common/constants/route-names';

import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: RouteNames.TASKS,
        pathMatch: 'full',
      },
      {
        path: RouteNames.TASKS,
        component: TasksPageComponent,
      },
      {
        path: `${RouteNames.TASK}/:id`,
        component: TaskPageComponent,
      },
      {
        path: RouteNames.CREATE_TASK,
        component: CreateTaskPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
