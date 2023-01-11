import { Component, Input } from '@angular/core';

import { Task } from '@tasks/models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  @Input() tasks!: Task[];

  constructor( ) { }

  public trackTask(index: number, task: Task): number | undefined {
    return task ? task.id : undefined;
  }

}
