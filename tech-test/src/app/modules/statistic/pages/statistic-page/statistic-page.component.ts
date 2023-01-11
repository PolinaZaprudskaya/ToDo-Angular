import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TasksStorageService } from '@common/services/tasks-storage.service';
import { RouteNames } from '@common/constants/route-names';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent {
  public tasks$ = this.tasksStorageService.tasks$;

  constructor(
    private router: Router,
    private tasksStorageService: TasksStorageService
  ) { }

  public navigateToAllTasks(): void{
    this.router.navigate(['/', RouteNames.TASKS]);
  }
}
