import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { AuthService } from './../../providers/auth-service/auth-service';
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

  refreshPage(): void {
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.navCtrl.pop()
    this.navCtrl.push(AdminPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

}
