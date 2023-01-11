import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPageComponent } from './tasks-page.component';
import { Task, TaskCategories } from '@tasks/models/task.model';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  const data: Task[] = [
    {
      id: 1,
      label: '1 Test',
      description: 'Test description 1',
      category: TaskCategories.SPORT,
      done: false,
    },
    {
      id: 2,
      label: '2 Test',
      description: 'Test description 2',
      category: TaskCategories.HEALTH,
      done: new Date(),
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksPageComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create tasks page', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined methods', () => {
    expect(component.filterBySearchAndCategory).toBeDefined();
    expect(component.navigate).toBeDefined();
    expect(component.openFilters).toBeDefined();
  });

  describe('openFilters()', () => {
    it('should open filter block', () => {
      component.isOpenFilters = false;
      component.openFilters();
      expect(component.isOpenFilters).toEqual(true);
    });

    it('should open filter block', () => {
      component.isOpenFilters = true;
      component.openFilters();
      expect(component.isOpenFilters).toEqual(false);
    });
  });

  describe('filterBySearchAndCategory()', () => {
    it('should filter by search text', () => {
      component.searchValue = '1';
      component.filterBySearchAndCategory();
      component.tasks$.subscribe((tasks) => {
        expect(tasks).toEqual([data[0]]);
        expect(tasks.length).toEqual(1);
      });
    });

    it('should filter by category (all)', () => {
        component.selectedCategory = 'all';
        component.filterBySearchAndCategory();
        component.tasks$.subscribe((tasks) => {
          expect(tasks).toEqual(data);
          expect(tasks.length).toEqual(2);
      });
    });

    it('should filter by category (health)', () => {
      component.selectedCategory = TaskCategories.HEALTH;
      component.filterBySearchAndCategory();
      component.tasks$.subscribe((tasks) => {
        expect(tasks).toEqual([data[1]]);
        expect(tasks.length).toEqual(1);
      });
    });

    it('should filter by category and search text', () => {
      component.selectedCategory = TaskCategories.HEALTH;
      component.searchValue = '1';
      component.filterBySearchAndCategory();
      component.tasks$.subscribe((tasks) => {
        expect(tasks).toEqual([]);
        expect(tasks.length).toEqual(0);
      });
    });
  });
});
