import { PaymentPage } from './../payment/payment';
import { Order } from './../../app/order/order';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  order: FormGroup;

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
    let newOrder = this.order.value as Order;
    newOrder.amount = Order.calculateAmount(newOrder.size);

    this.totalValue += newOrder['amount'] * newOrder['quantity'];

    console.log("Adding " + JSON.stringify(newOrder));

    this.shoppingCart.push(newOrder);

    // clean form
    this.buildNewForm();
  }


  /**
   * Removing chopp to shopping cart
   */
  public removeToCart(order): void {
    let index = this.shoppingCart.indexOf(order);
    this.shoppingCart.splice(index, 1);
    this.totalValue -= order.amount * order.quantity
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
