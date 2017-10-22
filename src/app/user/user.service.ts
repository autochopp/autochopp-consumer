import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ENV } from '@app/env';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  

  constructor(
    private http: Http
  ) { }

  create(user: User) {
    // tokenize user data. 
    // Sending format expected by API
    const userData = {
      'user': {
        'email': user.email,
        'password': user.password,
        'password_confirmation': user.password_confirmation
      }
    };

    const createURL = ENV.api + '/users/';

    return this.http.post(createURL, userData)
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}