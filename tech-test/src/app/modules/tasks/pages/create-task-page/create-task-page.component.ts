import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TasksApiService } from '@common/services/tasks-api.service';
import { TasksStorageService } from '@common/services/tasks-storage.service';
import { RouteNames } from '@common/constants/route-names';
import { Task, TaskCategories } from '@tasks/models/task.model';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss']
})
export class CreateTaskPageComponent implements OnInit, OnDestroy {
  public taskForm: FormGroup;
  public categories = Object.values(TaskCategories).map((cat) => ({ name: cat, value: cat}));
  public isLoading = false;
  private tasksSubscription?: Subscription;
  private tasks: Task[];

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
  ) {
    this.tasksSubscription = this.tasksStorageService.tasks$.subscribe((tasks) => this.tasks = tasks);
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      label: ['', [Validators.required, Validators.min(5), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.min(5), Validators.maxLength(200)]],
      category: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe();
  }

  public createTask(): void {
    this.isLoading = true;
    const { label, description, category } = this.taskForm.value;

    this.tasksApiService.createTask({
      id: (this.tasks[this.tasks?.length - 1]?.id || 0) + 1,
      label,
      description,
      category,
      done: false
    }).subscribe({
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

  public navigateToAllTasks(): void {
    this.router.navigate(['/', RouteNames.TASKS]);
  }
}
