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
  
  activateChopps = [];
  waitingPaymentChopps = [];
  tabsValidator = true;
  buttonColorX: string = '#e4ac06';
  buttonColorY: string = '#6d6e72';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public chopppsServiceProvider: ChoppsServiceProvider
  ) 
  {
    this.chopppsServiceProvider.getChopps().then(res => {
      res.map(chopp => {
        if(chopp['qrcode'] !== null && chopp['qrcode_validate'] === true){
          chopp['isHidden'] = true;
          this.activateChopps.push(chopp);
        } 
        else if(chopp['qrcode'] === null){
          this.waitingPaymentChopps.push(chopp);
        }
      })
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoppsPage');
  }
  
  showActivateChopps(){
    this.tabsValidator = true;
    if (this.buttonColorX !== '#e4ac06'){
      this.swapButtonColors();
    }
  }
  
  showWaitingPaymentChopps(){
    this.tabsValidator = false;
    if (this.buttonColorY !== '#e4ac06'){
      this.swapButtonColors();
    }
  }
  
  swapButtonColors(){
    let temp = this.buttonColorX;
    this.buttonColorX = this.buttonColorY;
    this.buttonColorY = temp;
  }
  
}
