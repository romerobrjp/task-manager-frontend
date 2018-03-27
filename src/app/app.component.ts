import { Component } from '@angular/core';

import { Task } from './tasks/shared/task.model';

import { Angular2TokenService } from "angular2-token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public constructor(private tokenService: Angular2TokenService) {
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