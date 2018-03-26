import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { Angular2TokenService } from "angular2-token";
import { Observable } from "rxjs/Observable";

import { User } from "./user.model";

@Injectable()

export class AuthService {
  public constructor(private tokenService: Angular2TokenService) {

  }

  public signUp(user: User): Observable<Response> {
    return this.tokenService.registerAccount(user as any).catch(this.handleErrors)
  }

  public signIn(uid: string, password: string) {

  }

  public signOut() {
    
  }

  public userSignedIn() {
    
  }

  public handleErrors(error: Response) {
    return Observable.throw(error);
  }
}