import { UserService } from './../../app/user/user.service';
import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { User } from "../../app/user/user";

@Component({
  templateUrl: 'user-register.html',
})
export class UserRegisterPage implements OnInit {
  userForm: FormGroup;

  user = new User('', '');

  constructor (
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }
  
  ngOnInit(): void {
    this.userForm = this.user.getBasicForm(this.formBuilder);
    this.userForm.addControl('password_confirmation', 
      new FormControl(this.user.password_confirmation, [Validators.required])
    );

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
    for (const field in this.user.formErrors) {
      // clear previous error message (if any)
      this.user.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.user.validationMessages[field];
        for (const key in control.errors) {
          this.user.formErrors[field] += messages[key];
        }
      }
    }
  }
}
