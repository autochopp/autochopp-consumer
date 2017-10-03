import { CardService } from './../../app/card/card.service';
import { Card } from './../../app/card/card';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';

declare var PagSeguroDirectPayment: any;

@Component({
  templateUrl: 'card-register.html',
})
export class CardRegisterPage {
  cardForm: FormGroup;

  public card = new Card();

  public pagseguroActive = false;

  public constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService
  ) {
    this.loadsPagseguro();
  }

  /**
   * Choose the brand of card from card.cardNumber.
   * This event should be fired automatically.
   */
  private searchBrand(): void {
    PagSeguroDirectPayment.getBrand({
      cardBin: this.card.cardNumber,
      success: response => {
        this.card.brand = response.brand.name;
      },
      error: response => {
        console.log(response);
      }
    });
  }

  /**
   * Request API card to register
   */
  public create(): void {
    const card = this.cardForm.value as Card;
    card.hashBuyer = PagSeguroDirectPayment.getSenderHash();

    this.createCardToken();

    this.cardService.create(card)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  /**
   * To perfom a transaction, API needs a card token.
   */
  private createCardToken(): void {
    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.card.cardNumber,
      cvv: this.card.securityCode,
      expirationMonth: this.card.expirationMonth,
      expirationYear: this.card.expirationYear,
      brand: this.card.brand,

      success: response => {
        this.card.hashCard = response.card.token;
      },
      error: response => {
        console.log(response)
      }
    });
  }

  /**
   * Loads pagseguro's javascript into front-end view.
   */
  private loadsPagseguro(): void {

    if (!this.pagseguroActive) {
      // Set page of view to perform requests of Pagseguro API.
      new Promise((resolve) => {
        let script: HTMLScriptElement = document.createElement('script');
        script.addEventListener('load', r => resolve());
        script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
        document.head.appendChild(script);
      });

      // API should generate ID to be consumer here
      this.cardService
        .startSession()
        .subscribe(result => this.openSession(result));
    } else {
      // Just use pagsegure
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

}