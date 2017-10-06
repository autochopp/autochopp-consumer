import { Component } from '@angular/core';

import { Validators, FormBuilder } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.order = this.formBuilder.group({
      tamanho: ['', Validators.required],
      tipo: ['', Validators.required],
      colarinho: ['', Validators.required]
    });
  }

  postDados(){
    console.log(this.order.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
