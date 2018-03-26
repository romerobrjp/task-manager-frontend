import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
import { FormUtils } from '../shared/form-utils';
import { User } from "../shared/user.model";

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent {
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

  public signUpUser() {
    this.submitted = true;

    this.authService.signUp(this.form.value as User)
      .subscribe(
        success => {
          console.log(success);
          alert('Parabéns, conta criada com sucesso');
          this.formErrors = null;
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.submitted = false;
          if (error.status === 422) {
            this.formErrors = JSON.parse(error._body).errors.full_messages;
          }
          else {
            this.formErrors = ['Ocorreu um erro e não foi possível cadastrar o usuário. Tente novamente mais tarde.']
          }
        }
      )
  }

  public passwordConfirmationValidator(form: FormGroup) {
    if (form.get('password').dirty && form.get('password').value === form.get('password_confirmation').value) {
      form.get('password_confirmation').setErrors(null)
    } else {
      form.get('password_confirmation').setErrors({ mismatch: true })
    }
  }

  public setupForm() {
    this.form = this.formBuilder.group(
      {
        name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        password_confirmation: [null, [Validators.required, Validators.minLength(6)]]
      },
      { 
        validator: this.passwordConfirmationValidator 
      }
    )
  }
}