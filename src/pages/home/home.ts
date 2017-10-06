import { HomeLoggedPage } from './../home-logged/home-logged';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, App } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';
import { JwtHelper } from "angular2-jwt";

import { UserRegisterPage } from '../user-register/user-register';

import { Storage } from "@ionic/storage";

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  error: string;
  jwtHelper = new JwtHelper();

  user: string;

  // used by showLoader() method
  loading: any;

  loginData = { email: '', password: '' };

  constructor(
    public app: App,
    public navCtrl: NavController,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private storage: Storage,
  ) {
    storage.ready()
      .then(() => {
        this.updateUserSession();
      })
      .catch(() => console.log("User not logged"));
  }

  /**
   * Request server authentication by authService
   */
  public doLogin(): void {
    this.showLoader();

    this.authService.login(this.loginData)
      .subscribe(
        data => {
          this.authenticate(data);
          this.navCtrl.setRoot(HomeLoggedPage);
        },
        err => {
          this.presentToast(err);
          console.log(err);
        }
      );
    // after all
    this.loading.dismiss();
  }

  /**
   * Clear session
   */
  public logout(): void {
    this.storage.remove('token');
    this.user = null;
  }

  private updateUserSession(): void {
    this.storage.get('user')
      .then(user => this.user = JSON.parse(user));
  }

  /**
   * Save token and user profile on ionic storage
   * 
   * @param token getted of API
   */
  private authenticate(token): void {
    this.storage.set('token', token);

    this.storage.set('user', this.user);
  }

  /**
   * Show loader animation when login action is triggered
   */
  private showLoader(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  private presentToast(message): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /**
   * Used into home view
   */
  public pushPage():void {
    this.navCtrl.push(UserRegisterPage);
  }

}