import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TasksStorageService } from '@common/services/tasks-storage.service';
import { TasksApiService } from '@common/services/tasks-api.service';
import { RouteNames } from '@common/constants/route-names';
import { Task, TaskCategories } from '@tasks/models/task.model';
import { Subscription } from 'rxjs';
import { BACKGROUND_THEME } from '@shared/directives/task-theme.directive';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, OnDestroy {
  public editMode = false;
  public isLoading = false;
  public theme = BACKGROUND_THEME.LIGHT;
  public taskForm: FormGroup;
  public task: Task;
  public categories = Object.values(TaskCategories).map((cat) => ({ name: cat, value: cat})) ;
  private taskSubscription?: Subscription;

  get label(): FormControl {
    return this.taskForm.get('label') as FormControl;
  }

  get description(): FormControl {
    return this.taskForm.get('description') as FormControl;
  }

  get category(): FormControl {
    return this.taskForm.get('category') as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tasksApiService: TasksApiService,
    private tasksStorageService: TasksStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.taskSubscription = this.tasksApiService.getTaskById(id).subscribe((task) => {
      if (task) {
        this.task = task;
        this.taskForm = this.formBuilder.group({
          label: [task.label, [Validators.required, Validators.min(5), Validators.min(25)]],
          description: [task.description, [Validators.required, Validators.min(5), Validators.maxLength(200)]],
          category: [task.category, [Validators.required]]
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }

  public updateTaskInfo(): void {
    this.isLoading = true;
    const { label, description, category } = this.taskForm.value;

    const newTask = {
      ...this.task,
      label,
      description,
      category
    };

    this.tasksApiService.updateTask(newTask).subscribe({
      next: () => {
        this.isLoading = false;
        this.tasksStorageService.reFetch();
        this.editMode = false;
        this.task = newTask;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  public deleteTask(task: Task): void {
    if (!this.isLoading) {
      this.isLoading = true;
      this.tasksApiService.deleteTask(task.id).subscribe({
        next: () => {
          this.isLoading = false;
          this.tasksStorageService.reFetch();
          this.navigateToAllTasks();
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  public navigateToAllTasks(): void {
    this.router.navigate(['/', RouteNames.TASKS]);
  }

  public navigateToStatistic(): void {
    this.router.navigate(['/', RouteNames.STATISTIC]);
  }
}
