import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Angular2TokenService } from "angular2-token";
import { Observable } from "rxjs/Observable";

import { User } from "./user.model";

@Injectable()

export class AuthService {
  public constructor(private tokenService: Angular2TokenService) {

  }

  public signUp(user: User) {
    
  }

  public signIn(userId: string, password: string) {

  }

  public signOut() {
    
  }

  public isUserSignIn() {
    
  }
}