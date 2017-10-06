import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  apiUrl = 'http://localhost:3000';

  constructor(
    public http: Http,
    public storage: Storage
  ) { }

  login(credentials) {
    const url = this.apiUrl + "/authenticate";

    return this.http.post(url, credentials)
      .map(res => res.json());
  }
}