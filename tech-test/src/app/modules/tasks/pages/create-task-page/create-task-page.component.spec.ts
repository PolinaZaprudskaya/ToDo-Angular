import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CreateTaskPageComponent } from './create-task-page.component';

describe('CreateTaskPageComponent', () => {
  let component: CreateTaskPageComponent;
  let fixture: ComponentFixture<CreateTaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaskPageComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ FormBuilder ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create create task page component', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined lifecycle methods', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.ngOnDestroy).toBeDefined();
  });

  it('should be defined methods', () => {
    expect(component.navigateToAllTasks).toBeDefined();
    expect(component.createTask).toBeDefined();
  });
});
