import { AuthService } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { OrderPage } from  '../order/order';
import { ChoppsPage } from '../chopps/chopps';
import { HomePage } from '../home/home';


/**
 * Generated class for the HomeLoggedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-logged',
  templateUrl: 'home-logged.html',
})
export class HomeLoggedPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService
  ) {
    console.log("User is logged? " + this.authService.isLogged());
  }

  goToOrderPage(): void {
    this.navCtrl.push(OrderPage);
  }

  goToChoppsPage(): void {
    this.navCtrl.push(ChoppsPage);
  }

  logout(): void{
    this.authService.logout();
    this.navCtrl.setRoot(HomePage);            
    this.navCtrl.popToRoot();
  }

}
