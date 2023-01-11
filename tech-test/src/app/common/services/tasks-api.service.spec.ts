import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TasksApiService } from './tasks-api.service';
import { Task, TaskCategories } from '@tasks/models/task.model';
import { environment } from '../../../environments/environment';

describe('TasksApiService', () => {
  let tasksApiService: TasksApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksApiService]
    });
    injector = getTestBed();
    tasksApiService = injector.get(TasksApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(tasksApiService).toBeTruthy();
  });

  it('getAllTasks() should return all tasks', () => {
    tasksApiService.getAllTasks().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(data);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });

  it('getTaskById() should return an task', () => {
    tasksApiService.getTaskById(1).subscribe(task => {
      expect(task).toEqual(data[0]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toBe('GET');
    req.flush(data[0]);
  });

  it('updateTask() should update task', () => {
    tasksApiService.updateTask(data[0]).subscribe(task => {
      expect(task).toEqual(data[0]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(data[0]);
  });

  it('createTask() should update task', () => {
    tasksApiService.createTask(data[0]).subscribe(task => {
      expect(task).toEqual(data[0]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(data[0]);
  });

  it('removeTask() should remove task', () => {
    tasksApiService.deleteTask(1).subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });
});
