import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, App } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service/auth-service';
import { ContactPage } from '../contact/contact'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
    this.authService.logout().then((result) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.loginData)
    .then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(ContactPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
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

}