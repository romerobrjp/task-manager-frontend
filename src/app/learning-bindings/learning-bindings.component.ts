import { Component } from '@angular/core';

@Component({
  selector: 'learning-bindings',
  templateUrl: './learning-bindings.component.html'
})

export class LearningBindingsComponent {
  public mouseClickCounter = 0;
  public mouseOverCounter = 0;
  public username: string;
  public email: string;

  public constructor() {
    this.mouseClickCounter = 0;
    this.mouseOverCounter = 0;
    this.username = '';
    this.email = '';
  }

  //mouse events
  public onClick() {
    console.log("clicou");
    this.mouseClickCounter++;
  }

  public onMouseOver() {
    console.log("Mouse passou por cima!");
    this.mouseOverCounter++;
  }

  public onKeyDown(event: any) {
    console.log("keydown!");
    console.log(event);
    this.username = event.target.value;
  }

  public onKeyUp(event: any) {
    console.log("keyup!");
    this.email = event.target.value;
  }
}