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
    // TODO this actually not work
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
      .subscribe(result => {
        if(result) {
          this.navCtrl.setRoot(HomeLoggedPage);
        } else {
          this.presentToast("Dados incorretos...");
        }
     
      });
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

  // TODO refactor this
  private updateUserSession(): void {
    this.storage.get('user')
      .then(user => this.user = JSON.parse(user));
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