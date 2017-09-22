import { UserService } from './../../app/user/user.service';
import { Component } from '@angular/core';

import { User } from "../../app/user/user";

@Component({
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {

  user = new User('', '');

  constructor(private userService: UserService) { }

  validate() {
    if(this.user.password !== this.user.password_confirmation) {
      console.log("Wrong password confirmation");
    }
  }

  create() {
    this.userService.create(this.user)
      .then(user => console.log("User sucessful register"))
      .catch(error => console.error(error))
  }

}
