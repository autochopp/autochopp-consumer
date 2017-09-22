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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
      password_confirmation: [this.user.password_confirmation, Validators.required],
    });
  }

  create() {
    this.user = this.userForm.value;
    this.userService.create(this.user)
      .then(user => console.log("User sucessful register"))
      .catch(error => console.error(error))
  }

}
