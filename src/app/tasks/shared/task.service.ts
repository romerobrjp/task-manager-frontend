import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core'; // avisa pro angular que talvez essa classe de serviço tenha dependências para ser injetadas dentro dela
//sempre que criar classe uma classe de serviço, deve-se usar o decorator Injectable


import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import { Task } from './task.model'

const TASKS: Array<Task> = [
  { id: 1, title: 'Fazer tarefa 1' },
  { id: 2, title: 'Fazer tarefa 2' },
  { id: 3, title: 'Fazer tarefa 3' },
  { id: 4, title: 'Fazer tarefa 4' },
  { id: 5, title: 'Fazer tarefa 5' },
  { id: 6, title: 'Fazer tarefa 6' },
  { id: 7, title: 'Fazer tarefa 7' }
];

@Injectable()
export class TaskService {
  public tasksUrl = 'api/tasks';

  constructor(private http: Http) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl).map( (response: Response) => response.json().data as Task[]);
  }

  // public getImportantTasks(): Promise<Task[]> {
  //   return Promise.resolve(TASKS.filter(t => t.id % 2 == 0) );
  // }

  // public getTask(id: number): Promise<Task> {
  //   return this.getTasks()
  //     .then(tasks => tasks.find(task => task.id === id))
  // }
}
