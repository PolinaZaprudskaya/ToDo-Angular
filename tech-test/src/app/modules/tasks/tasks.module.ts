import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

const PAGES = [
  TasksPageComponent,
  TaskPageComponent,
  CreateTaskPageComponent,
];

const COMPONENTS = [
  TasksListComponent,
  TaskItemComponent
];

@NgModule({
  declarations: [
    ...PAGES,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
