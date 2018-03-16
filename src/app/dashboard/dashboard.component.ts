import { Component, OnInit } from '@angular/core';

import { TaskService } from '../tasks/shared/task.service';
import { Task } from '../tasks/shared/task.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public tasks: Task[];

  public ngOnInit() {
    this.taskService.getImportantTasks()
      .then((tasks) => this.tasks = tasks);
  }

  public constructor(private taskService: TaskService) {
    this.taskService.getTasks().then((tasks) => console.log(tasks));
  }
}