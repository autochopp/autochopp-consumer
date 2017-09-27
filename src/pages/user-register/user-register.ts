import { NavController } from 'ionic-angular';
import { AlertPage } from './../alert/alert';
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

  // redirects after register
  alertPage = AlertPage;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController
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
    const user = this.userForm.value;

    const navCtrlParams = { 'message': this.getSuccessMessage(user) };

    this.userService.create(user)
      .then(user => this.navCtrl.push(AlertPage, navCtrlParams))
      .catch(error => this.throwAPIError(error));
  }

  private getSuccessMessage(user: User): string {
    return "Register was been suceed, please confirm your email.";
  }

  private onValueChanged(data?: any): void {
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

  private throwAPIError(errors: any): void {
    const jsonErrors = errors.json();

    // clean formErrors
    for (const field in this.user.formErrors) {
      this.user.formErrors[field] = '';
    }

    for (const field in jsonErrors) {
      this.user.formErrors[field] += jsonErrors[field]
    }
  }
}
