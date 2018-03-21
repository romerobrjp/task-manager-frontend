import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit {
  public task: Task;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute, // este objeto entrega as informações referentes à rota que está ativa no momento da navegação
    private location: Location
  ) {
  }

  public ngOnInit() {
    // switchMap vai executar as coisas antes de passar pro subscribe
    this.route.params
    .switchMap(
      (params: Params) => this.taskService.getTask(+params['id'])
    )
    .subscribe(
      task => this.task = task,
      error => alert('Ocorreu um erro no ngOnInit de TaskDetailComponent: ' + error)
    );
  }

  public goBack() {
    this.location.back();
  }

  public update() {
    if (!this.task.title) {
      alert('A tarefa deve ter um titulo!');
    }
    else {
      this.taskService.update(this.task).subscribe(
        () => alert(`Tarefa ${this.task.id} atualizada com sucesso`),
        error => alert('Ocorreu um erro no update de TaskDetailComponent: ' + error)
      )
    }
  }
}