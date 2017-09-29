import { Card } from './card';

import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CardService {

  constructor(private http: Http) { }

  public startSession() {
    const startSession = "";
    return this.http.get(startSession)
      .map(res => res.json());
  }

  public create(card: Card) {
    const body = JSON.stringify({ card });

    const createURL = "";

    return this.http.post(createURL, body)
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