import { Component } from '@angular/core';

import { Task } from './tasks/shared/task.model';

import { TokenService } from './shared/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public constructor(private tokenService: TokenService) {
    this.tokenService.init({
      apiBase: 'http://api.taskmanager.test:3000',
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accep': 'application/vnd.taskmaneger.v2'
        }
      }
    })
  }
}