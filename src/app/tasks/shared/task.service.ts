import { Response } from '@angular/http';
// import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; // avisa pro angular que talvez essa classe de serviço tenha dependências para ser injetadas dentro dela
//sempre que criar classe uma classe de serviço, deve-se usar o decorator Injectable

import { Observable } from 'rxjs/Observable';

import { Task } from './task.model';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TaskService {
  public tasksUrl = 'tasks';

  constructor(private tokenHttp: Angular2TokenService) {}

  public getAll(): Observable<Task[]> {
    const url = `${this.tasksUrl}?q[s]=updated_at+DESC`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response));
  }

  public getImportant(): Observable<Task[]> {
    const url = `${this.tasksUrl}?q[s]=deadline+ASC`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseToTasks(response))
  }

  public getById(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => this.responseTotAsk(response));
  }

  public create(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}`;
    const body = JSON.stringify(task);

    return this.tokenHttp.post(url, body)
      .catch(this.handleErrors)
      .map(response => this.responseTotAsk(response))
  }

  public update(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    const body = JSON.stringify(task);

    return this.tokenHttp.put(url, body)
      .catch(this.handleErrors)
      .map(() => task)
  }

  public delete(id: Number): Observable<null> {
    const url = `${this.tasksUrl}/${id}`;

    return this.tokenHttp.delete(url)
      .catch(this.handleErrors)
      .map(() => null)
  }

  public searchByTitle(term: string): Observable<Task[]> {
    // let url = `${this.tasksUrl}?title=${term}`;
    const url = `${this.tasksUrl}?q[title_cont]=${term}`;

    return this.tokenHttp.get(url)
      .catch(this.handleErrors)
      .map(response => this.responseToTasks(response))
  }

  // PRIVATE METHODS -----------------------------------------------------------

  private handleErrors(error: Response) {
    return Observable.throw(error);
  }

  private responseToTasks(response: Response): Array<Task> {
    const collection = response.json().data as Array<any>;
    const tasks: Task[] = [];

    collection.forEach(item => {
      const task = new Task(
        item.id,
        item.attributes.title,
        item.attributes.description,
        item.attributes.done,
        item.attributes['deadline-to-br']
      );

      tasks.push(task);
    });

    return tasks;
  }

  private responseTotAsk(response: Response): Task {
    return new Task(
      response.json().data.id,
      response.json().data.attributes.title,
      response.json().data.attributes.description,
      response.json().data.attributes.done,
      response.json().data.attributes['deadline-to-br']
    )
  }
}
