import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
  private api_url: string;

  constructor(private http: Http) {
    this.api_url = 'https://fast-retreat-18030.herokuapp.com';
  }

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

    const createURL = this.api_url + '/users/';

    return this.http.post(createURL, userData)
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}