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

  public constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.setupForm();
    this.formUtils = new FormUtils(this.form);
  }

  public signUpUser() {
    console.log('entrou no signUpUser()');
    
    this.authService.signUp(this.form.value as User)
      .subscribe(
        response => {
          console.log(response);
          alert('Parabéns, conta criada com sucesso');
          this.router.navigate(['/dashboard']);
        },
        error =>  console.log('Deu merda: no signUpUser: ', error)
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