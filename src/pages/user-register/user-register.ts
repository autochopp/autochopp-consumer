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

  constructor (
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
    this.user = this.userForm.value;

    this.userService.create(this.user)
      .then(user => this.navCtrl.push(AlertPage, {'message' : this.getSuccessMessage(user)}))
      .catch(error => console.error(error));

    this.user = new User('', '');
  }

  getSuccessMessage(user: User):string {
    return "Register was been suceed, please confirm your email.";
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
