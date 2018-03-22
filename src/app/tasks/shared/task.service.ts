import { Headers, Http, Response } from '@angular/http';
// import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; // avisa pro angular que talvez essa classe de serviço tenha dependências para ser injetadas dentro dela
//sempre que criar classe uma classe de serviço, deve-se usar o decorator Injectable


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  public tasksUrl = 'api/tasks';

  constructor(private http: Http) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportantTasks(): Observable<Task[]> {
    return this.getTasks()
      .catch(this.handleErrors)
      // .map(tasks => tasks.slice(0, 4));
      .map(tasks => tasks.filter(t => t.id % 2 == 0) );
  }

  public getTask(id: number): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map(
        (response: Response) => response.json().data as Task
      );
  }

  public create(task: Task): Observable<Task> {
    let url = `${this.tasksUrl}`;
    let body = JSON.stringify(task);
    let headers = new Headers({'Content-type': 'application/json'});

    return this.http.post(url, body, { headers: headers })
      .catch(this.handleErrors)
      .map(response => response.json().data as Task)
  }

  public update(task: Task): Observable<Task> {
    let url = `${this.tasksUrl}/${task.id}`;
    let body = JSON.stringify(task);
    let headers = new Headers({'Content-type': 'application/json'});

    return this.http.put(url, body, { headers: headers })
      .catch(this.handleErrors)
      .map(() => task)
  }

  private handleErrors(error: Response) {
    console.log('Deu erro: ', error);
    return Observable.throw(error);
  }
}
