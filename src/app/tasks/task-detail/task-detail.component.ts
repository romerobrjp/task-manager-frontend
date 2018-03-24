import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  public task: Task;
  public reactiveTaskForm: FormGroup;
  public doneOptions:Array<any> = [
    { value: false, text: 'Pendente' },
    { value: true, text: 'Feito' }
  ];

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute, // este objeto entrega as informações referentes à rota que está ativa no momento da navegação
    private location: Location,
  ) {
    this.reactiveTaskForm = new FormGroup({
      title: new FormControl(),
      deadline: new FormControl(),
      done: new FormControl(),
      description: new FormControl()
    })
  }

  public ngOnInit() {
    this.task = new Task(null, '');

    // switchMap vai executar as coisas antes de passar pro subscribe
    this.route.params
    .switchMap(
      (params: Params) => this.taskService.getById(+params['id'])
    )
    .subscribe(
      task => this.task = task,
      error => alert('Ocorreu um erro no ngOnInit de TaskDetailComponent: ' + error)
    );
  }

  public ngAfterViewInit() {
    $('#deadline').datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br',
    }).on('dp.change', () => this.task.deadline = $('#deadline').val());
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

  public showFieldSuccess(field) {
    return field.valid;
  }

  public showFieldError(field) {
    return field.invalid && (field.touched || field.dirty);
  }
}