import { UserService } from './../../app/user/user.service';
import { Component } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { User } from "../../app/user/user";

@Component({
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {
  private userForm: FormGroup;
  user = new User('', '');

  formErrors = {
    'email': '',
    'password': '',
    'password_confirmation': ''
  };

  validationMessages = {
    'email': {
      'pattern': 'Isso não parece ser um email válido!'
    },
    'password': {
      'minlength': 'Senha precisa ter no mínimo 8 caracteres'
    },
    'password_confirmation': {
      'passwordConfirmation': 'Confirmação inválida'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      email: [this.user.email, [
        Validators.required, Validators.pattern('[^ @]*@[^ @]*')
      ]
      ],
      password: [this.user.password, [
        Validators.required, Validators.minLength(6)
      ]
      ],
      password_confirmation: [this.user.password_confirmation, [
        Validators.required
      ]
      ],
    });

    this.userForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  create() {
    this.user = this.userForm.value;
    this.userService.create(this.user)
      .then(user => console.log("User sucessful register"))
      .catch(error => console.error(error))
  }

  onValueChanged(data?: any): void {
    if (!this.userForm) { return; }
    const form = this.userForm;

    // tslint:disable:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
