import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { FormUtils } from '../shared/form-utils';

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent {
  public form: FormGroup;
  public formUtils: FormUtils;

  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordConfirmationValidator })

    this.formUtils = new FormUtils(this.form);
  }

  public signUpUser() {
    console.log('Form signUp enviado');
    console.log(this.form.value);
  }

  public passwordConfirmationValidator(form: FormGroup) {
    if (form.get('password').dirty && form.get('password').value === form.get('password_confirmation').value) {
      form.get('password_confirmation').setErrors(null)
    } else {
      form.get('password_confirmation').setErrors({ mismatch: true })
    }
  }
}