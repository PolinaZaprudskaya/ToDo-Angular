import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksApiService } from '@common/services/tasks-api.service';
import { Task } from '@tasks/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksStorageService {
  public tasks$: Observable<Task[]> = this.tasksApiService.getAllTasks();

  constructor(
    private tasksApiService: TasksApiService
  ) { }

  public reFetch(): void {
    this.tasks$ = this.tasksApiService.getAllTasks();
  }

}
