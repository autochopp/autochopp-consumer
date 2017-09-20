import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './../user';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    create(user: User) {
        // tokenize user data, API expects real json
        const userData = {
            email: user.email,
            password: user.password
            // Excluding password confirmation
        };

        const createURL = 'https://fast-retreat-18030.herokuapp.com/users/';

        return this.http
            .post(createURL, userData)
            .toPromise()
            .then(res => res.json().data as User)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}