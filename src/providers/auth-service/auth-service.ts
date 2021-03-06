import { JwtHelper } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ENV } from '@app/env';

import 'rxjs/add/operator/toPromise';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  token: string;
  user_type: string;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: Http,
    public storage: Storage
  ) { }

  public login(credentials): Promise<any> {
    const url = ENV.api + "/authenticate";

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

    this.user_type = token.user_type;
    
    // user id and expiration token date
    console.log(this.jwtHelper.decodeToken(this.token));
  }

    /**
   * Clear session
   */
  public logout(): void {
    this.storage.remove('token')
    this.token = null
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