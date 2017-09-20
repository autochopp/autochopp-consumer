import { UserService } from './../../app/user/shared/user.service';
import { Component } from '@angular/core';

import { User } from "../../app/user/user";

@Component({
  selector: 'user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {

  user = new User(0, '', '', '');

  constructor(private userService: UserService) { }

  create() {
    this.userService.create(this.user)
      .then(user => console.log('Sucessful register'))
      .catch(user => console.log('Wrong params'));
  }

}
