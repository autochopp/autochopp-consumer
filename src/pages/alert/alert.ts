import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'alert.html'
})
export class AlertPage {
  message: string;

  constructor(public navParams: NavParams) {
    this.message = this.navParams.get('message');
  }
}
