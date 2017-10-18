import { HomeLoggedPage } from './../home-logged/home-logged';
import { CardService } from './../../app/card/card.service';
import { Card } from './../../app/card/card';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastController, NavController, NavParams } from "ionic-angular";

import scriptjs from 'scriptjs';

declare let PagSeguroDirectPayment;

@Component({
  templateUrl: 'payment.html',
})
export class PaymentPage {

  public cardForm: FormGroup;

  private card = new Card();

  private pagseguroActive = false;

  public constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    // TODO add more validations
    this.cardForm = this.card.getBasicForm(this.formBuilder);

    this.cardForm.valueChanges.subscribe(
      data => this.getLastData(data)
    );

    this.loadsPagseguro();
  }

  private getLastData(data: any): void {
    Object.assign(this.card, this.cardForm.value);
  }

  /**
   * Choose the brand of card from card.cardNumber.
   * This event should be fired automatically when user lost 
   * focus on card number input.
   */
  public searchBrand(): void {
    const cardBin = this.cardForm.value.cardNumber;

    console.log("CardBin sequence: " + cardBin);

    PagSeguroDirectPayment.getBrand({
      cardBin: cardBin,
      success: response => {
        console.log("Brand was found sucessful...");
        this.card.brand = response.brand.name;
      },
      error: response => {
        console.log(response);
      }
    });
  }

  /**
   * To perfom a transaction, API needs a card token.
   */
  public initBuyRequest(): void {

    this.card.hashBuyer = PagSeguroDirectPayment.getSenderHash();

    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.card.cardNumber,
      cvv: this.card.securityCode,
      expirationMonth: this.card.expirationMonth,
      expirationYear: this.card.expirationYear,
      brand: this.card.brand,

      success: response => {
        console.log("Card data is valid!");
        this.card.hashCard = response.card.token;
        this.submitToServer();
      },
      error: response => {
        this.presentToast("Cartão inválido. Por favor, verifique os dados do cartão.");
      }
    });
  }

  /**
   * Request API card to register
   */
  private submitToServer(): void {
    console.log("Card data when submit data is " + JSON.stringify(this.card));

    const order = this.navParams.get('order');

    this.cardService.create(this.card, order)
      .then(result => this.navCtrl.push(HomeLoggedPage))
      .catch(error => this.presentToast(error));
  }

  /**
   * Loads pagseguro's javascript into front-end view.
   */
  private loadsPagseguro(): void {

    let pagseguroLibURL = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
    if (!this.pagseguroActive) {
      scriptjs(pagseguroLibURL, ()=> {
      // API should generate ID to be consumer here
        this.cardService.startSession()
            .subscribe(data => this.openSession(data));
      });
    } else {
      // Just use pagseguro
    }
  }

  /**
   * Set pagseguro id, activating PagSeguroDirectPayment use
   * 
   * @param result is created in API to be used in JS calls
   */
  private openSession(result): void {
    PagSeguroDirectPayment.setSessionId(result);
    this.pagseguroActive = true;
  }

  private presentToast(message): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}