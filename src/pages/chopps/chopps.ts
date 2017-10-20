import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orders = this.getData();

  }

  createArrayOfOrders(){
    
    var arrayOfOrders : any = [
      {number:15675, size: "1000", chopp_type: "tradicional", collar: "2"},
      {number:15675, size: "500", chopp_type: "vinho", collar: "0"},
      {number:15675, size: "500", chopp_type: "vinho", collar: "1"},
      {number:15675, size: "1000", chopp_type: "tradicional", collar: "0"},
    ]

    //var ordersJSON : JSON;
    //ordersJSON = <JSON> arrayOfOrders;

    console.log( arrayOfOrders );

    return arrayOfOrders;

  }

  getData(){

    return this.createArrayOfOrders();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoppsPage');
  }

}
