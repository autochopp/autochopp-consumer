import { Component } from '@angular/core';
import { AuthService } from './../../providers/auth-service/auth-service';
import { NavController, NavParams } from 'ionic-angular';

import { AdminPage } from  '../admin/admin';
import { InstructionsPage } from  '../instructions/instructions';
import { HomePage } from  '../home/home';

/**
* Generated class for the HomeAdminPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html',
  
})
export class HomeAdminPage {
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService
    
  ) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdminPage');
  }
  
  goToAdminPage(): void {
    this.navCtrl.push(AdminPage);
  }
  
  goToInstructionsPage(): void {
    this.navCtrl.push(InstructionsPage);
  }
  
  logout(): void{
    this.authService.logout();
    this.navCtrl.setRoot(HomePage);            
    this.navCtrl.popToRoot();
  }
  
}
