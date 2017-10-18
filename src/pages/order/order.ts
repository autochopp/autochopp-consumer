import { PaymentPage } from './../payment/payment';
import { Order } from './../../app/order/order';
import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { NavController } from 'ionic-angular';

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
    this.buildNewForm();
  }

  /**
   * Adding chopp to shopping cart
   */
  public addToCart(): void {
    const newOrder = this.order.value as Order;

    console.log("Adding " + JSON.stringify(newOrder));

    this.shoppingCart.push(newOrder);

    // clean form
    this.buildNewForm();
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
    this.navCtrl.push(PaymentPage, {order: this.shoppingCart})
  }

  /**
   * Reset form to new order
   */
  private buildNewForm(): void {
    this.order = Order.buildBasicForm(this.formBuilder);
  }
}
