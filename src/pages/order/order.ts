import { Order } from './../../app/order/order';
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

  order: any = {};

  shoppingCart = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder) {
    this.order = this.buildNewForm();
  }

  public addToCart(): void {
    console.log("Adding " + this.order);

    this.shoppingCart.push(this.order as Order);
    this.order = this.buildNewForm();
  }

  private buildNewForm(): any {
    return Order.buildBasicForm(this.formBuilder);
  }
}
