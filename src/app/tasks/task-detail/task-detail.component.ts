import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit {
  @Input() public task: Task;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute // este objeto entrega as informações referentes à rota que está ativa no momento da navegação
  ) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskService.getTask(+params['id'])
        .then(task => this.task = task)
    })
  }
}