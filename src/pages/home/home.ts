import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, App } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';
import { HomeLoggedPage } from '../home-logged/home-logged';
import {Headers} from "@angular/http";
import {JwtHelper} from "angular2-jwt";
import { UserRegisterPage } from '../user-register/user-register';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  auth: AuthService;
  
  // When the page loads, we want the Login segment to be selected
  authType: string = "login";

  // We need to set the content type for the server
  contentHeader = new Headers({"Content-Type": "application/json"});
  error: string;
  jwtHelper = new JwtHelper();
  user: string;
  

  loading: any;
  isLoggedIn: boolean = false;
  loginData = { email: '', password: '' };
  data: any;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.remove('token');
    this.authService.logout()
  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData)
    .then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(HomeLoggedPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
      console.log(err)
    });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  pushPage():void {
    this.navCtrl.push(UserRegisterPage);
  }

  authSuccess(token) {
    this.error = null;
    localStorage.set('token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
    localStorage.set('profile', this.user);
  }

}