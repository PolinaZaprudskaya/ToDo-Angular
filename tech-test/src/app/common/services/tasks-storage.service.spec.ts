import { getTestBed, TestBed } from '@angular/core/testing';

import { TasksStorageService } from './tasks-storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksApiService } from '@common/services/tasks-api.service';

describe('TasksStorageService', () => {
  let tasksStorageService: TasksStorageService;
  let tasksApiService: TasksApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksApiService, TasksApiService]
    });
    injector = getTestBed();
    tasksStorageService = injector.get(TasksStorageService);
    tasksApiService = injector.get(TasksApiService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(tasksStorageService).toBeTruthy();
    expect(tasksApiService).toBeTruthy();
  });

});
