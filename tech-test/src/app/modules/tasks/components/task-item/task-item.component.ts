import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RouteNames } from '@common/constants/route-names';
import { TasksApiService } from '@common/services/tasks-api.service';
import { TasksStorageService } from '@common/services/tasks-storage.service';
import { Task } from '@tasks/models/task.model';
import { BACKGROUND_THEME } from '@shared/directives/task-theme.directive';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;

  public theme = BACKGROUND_THEME.REGULAR;

  constructor(
    private router: Router,
    private tasksApiService: TasksApiService,
    private tasksStorageService: TasksStorageService
  ) { }

  public navigate(): void {
    this.router.navigate(['/', RouteNames.TASK, this.task.id]);
  }

  public updateValue(value: any) {
    this.tasksApiService.updateTask({ ...this.task, done: value ? new Date() : false}).subscribe({
      next: () => this.tasksStorageService.reFetch()
    });
  }
}
