import { Injectable } from '@angular/core'; // avisa pro angular que talvez essa classe de serviço tenha dependências para ser injetadas dentro dela
//sempre que criar classe uma classe de serviço, deve-se usar o decorator Injectable
import { Task } from './task.model'

const TASKS: Array<Task> = [];

@Injectable()
export class TaskService {
  public getTasks(): Promise<Task[]> {
    let promise = new Promise(function(resolve, reject) {
      if (TASKS.length > 0) {
        resolve(TASKS);
      } else {
        let error_msg = 'Não há tarefas';
        reject(error_msg);
      }
    })

    return promise;
  }
}
