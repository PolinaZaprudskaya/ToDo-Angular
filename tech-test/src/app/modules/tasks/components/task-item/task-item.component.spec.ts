import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { Task, TaskCategories } from '@tasks/models/task.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const task: Task = {
    id: 1,
    label: 'Test 1',
    description: 'Test description 1',
    category: TaskCategories.SPORT,
    done: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create task item component', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined updateValue', () => {
    expect(component.updateValue).toBeDefined();
  });

  it('should be defined navigate', () => {
    expect(component.navigate).toBeDefined();
  });
});
