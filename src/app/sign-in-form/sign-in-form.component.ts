import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { FormUtils } from "../shared/form-utils";

import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'sign-in-form',
  templateUrl: './sign-in-form.component.html'
})

export class SignInFormComponent {
  public form: FormGroup;
  public formUtils: FormUtils;
  public submitted: boolean;
  public formErrors: Array<string>;

  public constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.setupForm();
    this.formUtils = new FormUtils(this.form);
    this.submitted = false;
    this.formErrors = null;
  }

  public signInUser() {
    this.submitted = true;

    this.authService.signIn(this.form.get('email').value, this.form.get('password').value)
      .subscribe(
        success => {
          this.formErrors = null;
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.submitted = false;
          if (error.status === 401) {
            this.formErrors = JSON.parse(error._body).errors;
          }
          else {
            this.formErrors = ['Ocorreu um erro e não foi possível logar. Tente novamente mais tarde.']
          }
        }
      )
  }

  public setupForm() {
    this.form = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]]
      }
    )
  }
}