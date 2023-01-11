import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Task, TaskCategories } from '@tasks/models/task.model';
import { TasksListComponent } from './tasks-list.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  const data: Task[] = [
    {
      id: 1,
      label: 'Test 1',
      description: 'Test description 1',
      category: TaskCategories.SPORT,
      done: false,
    },
    {
      id: 2,
      label: 'Test 2',
      description: 'Test description 2',
      category: TaskCategories.HEALTH,
      done: new Date(),
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    component.tasks = data;
    fixture.detectChanges();
  });

  it('should create tasks list component', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined trackTask', () => {
    expect(component.trackTask).toBeDefined();
  });
});
