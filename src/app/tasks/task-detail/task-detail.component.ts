import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styles: ['.form-control-feedback{ margin-right: 20px }']
})

export class TaskDetailComponent implements OnInit, AfterViewInit {
  public task: Task;
  public reactiveTaskForm: FormGroup;
  public doneOptions:Array<any>;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute, // este objeto entrega as informações referentes à rota que está ativa no momento da navegação
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.doneOptions = [
      { value: false, text: 'Pendente' },
      { value: true, text: 'Feito' }
    ];

    this.reactiveTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null, Validators.required],
      description: [null]
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
      task => this.setTask(task),
      error => alert('Ocorreu um erro no ngOnInit de TaskDetailComponent: ' + error)
    );
    console.log(this.task);
    
  }

  public ngAfterViewInit() {
    // $('#deadline').datetimepicker({
    //   'sideBySide': true,
    //   'locale': 'pt-br',
    // }).on('dp.change', () => this.task.deadline = $('#deadline').val());

    $('#deadline').datetimepicker({
      'sideBySide': true,
      'locale': 'pt-br',
    }).on('dp.change', () => this.getField('deadline').setValue($('#deadline').val() ));
  }

  public setTask(task: Task): void {
    this.task = task;
    this.reactiveTaskForm.patchValue(task);
  }

  public goBack() {
    this.location.back();
  }

  public update() {
    this.task.title = this.reactiveTaskForm.get('title').value;
    this.task.deadline = this.reactiveTaskForm.get('deadline').value;
    this.task.done = this.reactiveTaskForm.get('done').value;
    this.task.description = this.reactiveTaskForm.get('description').value;
    
    this.taskService.update(this.task).subscribe(
      () => alert(`Tarefa ${this.task.id} atualizada com sucesso`),
      (error) => alert('Ocorreu um erro no update de TaskDetailComponent: ' + error)
    )
  }

  // form errors methods
  public fieldClassForErrorOrSuccess(fieldName: string) {
    return {
      'has-error': this.showFieldError(fieldName),
      'has-success': this.getField(fieldName).valid
    }
  }

  public iconClassForErrorOrSuccess(fieldName: string) {
    return {
      'glyphicon-remove': this.showFieldError(fieldName),
      'glyphicon-ok': this.getField(fieldName).valid
    }
  }

  public showFieldSuccess(fieldName: string) {
    let field = this.getField(fieldName);
    return field.valid;
  }

  public showFieldError(fieldName: string) {
    let field = this.getField(fieldName);
    return field.invalid && (field.touched || field.dirty);
  }

  public getField(fieldName: string) {
    return this.reactiveTaskForm.get(fieldName);
  }
}