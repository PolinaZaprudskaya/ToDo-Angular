import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { TaskPageComponent } from './task-page.component';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPageComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ FormBuilder ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create task page component', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined lifecycle methods', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.ngOnDestroy).toBeDefined();
  });

  it('should be defined methods', () => {
    expect(component.navigateToAllTasks).toBeDefined();
    expect(component.updateTaskInfo).toBeDefined();
    expect(component.deleteTask).toBeDefined();
    expect(component.navigateToStatistic).toBeDefined();
  });
});
