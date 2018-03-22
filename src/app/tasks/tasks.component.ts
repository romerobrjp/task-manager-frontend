import { Component, OnInit } from '@angular/core';

import { Task } from './shared/task.model';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
  private newTask: Task;
  public tasks: Array<Task>;

  public constructor(private taskService: TaskService) {
    this.newTask = new Task(null, '');
  }

  public ngOnInit() {
    this.taskService.getAll().subscribe(
      tasks => this.tasks = tasks,
      error => alert('Ocorreu um erro ao tentar buscar as tasks:' + error)
    )
  }

  public create() {
    this.newTask.title = this.newTask.title.trim();

    if (!this.newTask.title) {
      alert('Tarefa sem título!');
    } else {
      this.taskService.create(this.newTask).subscribe(
        task => {
          this.tasks.push(task);
          this.newTask = new Task(null, '');
        },
        error => alert('Erro ao tentar criar nova tarefa => ' + error)
      )
    }
  }

  public delete(task: Task) {
    let confirmed = confirm(`Deseja realmente excluir a tarefa "${task.title}"?`);

    if (confirmed) {
      
      this.taskService.delete(task.id).subscribe(
        next => this.tasks = this.tasks.filter(t => t !== task),
        error => alert('Erro ao tentar criar nova tarefa => ' + error)
      )
    }
  }
}