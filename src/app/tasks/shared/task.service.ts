import { Http, Response } from "@angular/http";
import { Injectable } from '@angular/core'; // avisa pro angular que talvez essa classe de serviço tenha dependências para ser injetadas dentro dela
//sempre que criar classe uma classe de serviço, deve-se usar o decorator Injectable


import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import { Task } from './task.model'

@Injectable()
export class TaskService {
  public tasksUrl = 'api/tasks';

  constructor(private http: Http) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl).map( (response: Response) => response.json().data as Task[]);
  }

  public getImportantTasks(): Observable<Task[]> {
    return this.getTasks().map(tasks => tasks.filter(t => t.id % 2 == 0) );
  }

  public getTask(id: number): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`;

    return this.http.get(url).map(
      (response: Response) => response.json().data as Task
    );
  }
}
