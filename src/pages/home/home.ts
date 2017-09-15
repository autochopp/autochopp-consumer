import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserRegisterPage } from './../user-register/user-register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registerPage = UserRegisterPage;

  constructor(
    public navCtrl: NavController
  ) { }

  pushPage(): void {
    this.navCtrl.push(UserRegisterPage);
  }
}
