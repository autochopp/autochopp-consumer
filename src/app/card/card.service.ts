import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { Card } from './card';

import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardService {

  url = "http://localhost:3000";

  constructor(
    private authHttp: AuthHttp
  ) { }

  /**
   * Start pagseguro session through our server
   */
  public startSession(): Observable<any> {
    const startSession = this.url + "/getsessionid";

    return this.authHttp.get(startSession).map(res => res.json());
  }

  /**
   * Makes a purchase to server
   * 
   * @param card with information of buyer
   */
  public create(card: Card) {
    // const body = JSON.stringify({ card });

    const data = {
      chopps : [
        // test quantity
        {amount: 10.0, quantity: 1, size: 1000, chopp_type: "tradicional", collar: 1}
      ],
      card_name: card.ownerName,
      birthday: card.bornDate,
      cpf: card.ownerCPF,
      phone_code: card.areaCode,
      phone_number: card.phoneNumber,
      card_token: card.hashCard, 
      sender_hash: card.hashBuyer
    };

    const createURL = this.url + "/checkout/create";

    return this.authHttp.post(createURL, data)
      .toPromise()
      .then(result => console.log("Purchase made successfully!"))
      .catch(error => console.error("Some error happen: " + error));
  }
}