import { JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  apiUrl = 'http://localhost:3000';

  token: string;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: Http,
    public storage: Storage
  ) { }

  public login(credentials): Promise<any> {
    const url = this.apiUrl + "/authenticate";

    return this.http.post(url, credentials).toPromise();
  }

  /**
   * Save token and user profile on ionic storage
   * 
   * @param token getted of API
   */
  public authenticate(token): void {
    // it was necessary because json response format
    this.token = token.auth_token;

    this.storage.set('token', this.token);

    // user id and expiration token date
    console.log(this.jwtHelper.decodeToken(this.token));
  }

  /**
   * Uses function of angular2-jwt
   */
  public isLogged(): boolean {
      return tokenNotExpired(null, this.token);
  }

  public getToken(): string {
    return this.token;
  }
}