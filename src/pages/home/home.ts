import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserRegisterPage } from './../user-register/user-register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registerPage = UserRegisterPage;
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { 
    this.message = navParams.get('message');
  }

  pushPage(): void {
    this.navCtrl.push(UserRegisterPage);
  }
}
