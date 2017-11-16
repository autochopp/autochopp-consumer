import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { AuthService } from './../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';


/**
* Generated class for the AdminPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  temperature: 0;
  volume: 0;
  machineStatus: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public adminServiceProvider: AdminServiceProvider,
    public authService: AuthService

  ) {
    this.adminServiceProvider.getSensors().then
      (res => {
        this.temperature = res.json()['temperature']
        this.volume = res.json()['volume']
        this.machineStatus = res.json()['machine_status']
        console.log(res.json()['machine_status'])
      });

    console.log("status:" + this.machineStatus)
  }

  logout(): void {
    this.authService.logout();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  refreshPage(): void {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

}
