import { AuthHttp } from 'angular2-jwt';
import { Card } from './card';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardService {

  url = "http://localhost:3000";

  constructor(private http: Http, private auth: AuthHttp) { }

  public startSession() {
    const startSession = "/getsessionid";

    return this.http.get(startSession)
      .map(res => res.json());
  }

  public create(card: Card) {
    const body = JSON.stringify({ card });

    console.log("Body is " + body);

    const createURL = "/checkout/create";

    return this.auth.post(createURL, body)
      .toPromise()
      .then(card => card.json().data as Card)
      .catch(error => console.error(error));
  }

  public cancel() {
    const cancelURL = "";

    return this.http.get(cancelURL)
      .toPromise()
      .then(request => request.json())
      .catch(error => console.error(error));
  }
}