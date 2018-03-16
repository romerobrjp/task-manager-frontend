import { Injectable } from '@angular/core'; // avisa pro angular que talvez essa classe de serviço tenha dependências para ser injetadas dentro dela
//sempre que criar classe uma classe de serviço, deve-se usar o decorator Injectable
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
  public getTasks(): Promise<Task[]> {
    let promise = new Promise<Task[]>((resolve, reject) => {
      if (TASKS.length > 0) {
        resolve(TASKS);
      } else {
        let error_msg = 'Não há tarefas';
        reject(error_msg);
      }
    })

    return promise;
  }

  public getImportantTasks(): Promise<Task[]> {
    return Promise.resolve(TASKS.filter(t => t.id > 3));
  }

  public getTask(id: number): Promise<Task> {
    return this.getTasks()
      .then(tasks => tasks.find(task => task.id === id))
  }
}
