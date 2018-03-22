import { Component, OnInit } from '@angular/core';

import { TaskService } from '../tasks/shared/task.service';
import { Task } from '../tasks/shared/task.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public tasks: Task[];

  public constructor(private taskService: TaskService) {}
  
  public ngOnInit() {
    this.taskService.getImportant().subscribe({
      next: tasks => this.tasks = tasks,
      error: error => alert('Ocorreu um erro ao tentar buscar as tasks importantes: ' + error)
    });
  }
}