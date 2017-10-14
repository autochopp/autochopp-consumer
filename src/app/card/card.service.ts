import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { Card } from './card';

import { Http } from '@angular/http';
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
    const body = JSON.stringify({ card });

    console.log("Body is " + body);

    const createURL = this.url + "/checkout/create";

    return this.authHttp.post(createURL, body)
      .toPromise()
      .then(card => card.json().data as Card)
      .catch(error => console.error(error));
  }
}