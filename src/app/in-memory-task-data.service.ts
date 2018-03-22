import { Injectable } from "@angular/core";

import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable()

export class InMemoryTaskDataService implements InMemoryDbService {
  public createDb() {
    let tasks = [
      { id: 1, title: 'Limpar casa' },
      { id: 2, title: 'Fazer dever de casa' },
      { id: 3, title: 'Lavar banheiro' },
      { id: 4, title: 'Comprar pão' },
      { id: 5, title: 'Passear com o dog' }
    ];

    return { tasks };
  }
}