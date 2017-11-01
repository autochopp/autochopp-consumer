import { HomePage } from './../home/home';
import { NavController, ToastController } from 'ionic-angular';
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
    
    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private navCtrl: NavController,
      private toastCtrl: ToastController    
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

  public create(): void {
    const user = this.userForm.value;
    
    this.userService.create(user)
    .then(user => {
      this.navCtrl.push(HomePage);
      this.presentToast("Usuário criado com sucesso!");
    })
    .catch(error => this.throwAPIError(error));
  }


  private onValueChanged(data?: any): void {
    if (!this.userForm) { return; }
    const form = this.userForm;
    
    for (const field in this.user.formErrors) {
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

  private presentToast(message): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
      // dismissOnPageChange: true
    });
    
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
  }
}
