import { CardRegisterPage } from './../card-register/card-register';
import { Order } from './../../app/order/order';
import { Component } from '@angular/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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

  totalValue = 0;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder) {
    this.order = this.buildNewForm();
  }

  /**
   * Adding chopp to shopping cart
   */
  public addToCart(): void {
    const newOrder = this.order.value as Order;

    console.log("Adding " + JSON.stringify(newOrder));

    this.shoppingCart.push(newOrder);
    this.order = this.buildNewForm();
  }

  /**
   * See if cart shopping is empty
   */
  public isCartEmpty(): boolean {
    return this.shoppingCart.length === 0;
  }

  /**
   * FInish chooses and go to payment
   */
  public goToPaymentPage(): void {
    console.log("Go to paymment page");
    this.navCtrl.push(CardRegisterPage, {order: this.shoppingCart})
  }

  private buildNewForm(): FormGroup {
    return Order.buildBasicForm(this.formBuilder);
  }
}
