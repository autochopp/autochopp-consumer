import { Injectable } from '@angular/core';

import { Card } from './card';

import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ENV } from '@app/env';

@Injectable()
export class CardService {

  constructor(
    private authHttp: AuthHttp
  ) { }

  /**
   * Start pagseguro session through our server
   */
  public startSession(): Observable<any> {
    const startSession = ENV.api + "/getsessionid";

    return this.authHttp.get(startSession).map(res => res.json());
  }

  /**
   * Makes a purchase to server
   * 
   * @param card with information of buyer
   */
  public create(card: Card, order) {
    // const body = JSON.stringify({ card });

    const data = {
      chopps : order,
      card_name: card.ownerName,
      birthday: card.bornDate,
      cpf: card.ownerCPF,
      phone_code: card.areaCode,
      phone_number: card.phoneNumber,
      card_token: card.hashCard, 
      sender_hash: card.hashBuyer
    };

    const createURL = ENV.api + "/checkout/create";

    return this.authHttp.post(createURL, data)
      .toPromise()
      .then(result => console.log("Purchase made successfully!"))
      .catch(error => console.error("Some error happen: " + error));
  }
}