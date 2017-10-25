import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChoppsServiceProvider } from '../../providers/chopps-service/chopps-service';
import 'rxjs/add/operator/map';


/**
 * Generated class for the ChoppsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chopps',
  templateUrl: 'chopps.html',
})
export class ChoppsPage {

  orders : any [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public chopppsServiceProvider: ChoppsServiceProvider
  ) 
    {
    // this.orders = this.getData();
    this.chopppsServiceProvider.getChopps().then(res => {
      res.map(x => x['isHidden'] = true);
      this.orders = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoppsPage');
  }

}
