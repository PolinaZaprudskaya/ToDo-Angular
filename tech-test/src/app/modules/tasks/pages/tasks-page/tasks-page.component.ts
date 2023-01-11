import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RouteNames } from '@common/constants/route-names';
import { TasksStorageService } from '@common/services/tasks-storage.service';
import { Task, TaskCategories } from '@tasks/models/task.model';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  public allTasks$: Observable<Task[]> = this.tasksStorageService.tasks$;
  public tasks$: Observable<Task[]> = this.tasksStorageService.tasks$;
  public searchValue = '';
  public selectedCategory = 'all';
  public categories = [
    ...Object.values(TaskCategories).map((cat) => ({ name: cat, value: cat})),
    { name: 'all', value: 'all'}
  ];
  public isOpenFilters = false;

  constructor(
    private router: Router,
    private tasksStorageService: TasksStorageService
  ) { }

  public navigate(): void {
    this.router.navigate(['/', RouteNames.CREATE_TASK]);
  }

  public filterBySearchAndCategory(): void {
    if (this.searchValue.length === 0 && this.selectedCategory === 'all') {
      this.tasks$ = this.allTasks$;
    } else {
      this.tasks$ = this.allTasks$.pipe(
        map((tasks) => {
          const regexp = new RegExp('^' + this.searchValue);
          return tasks.filter(task => {
            return (task.category === this.selectedCategory || this.selectedCategory === 'all')
              && task.label.match(regexp);
          });
        })
      );
    }
  }

  public openFilters(): void {
    this.isOpenFilters = !this.isOpenFilters;
  }
}
