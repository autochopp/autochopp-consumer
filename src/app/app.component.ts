import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { HomePage } from './../pages/home/home';
import { HomeLoggedPage } from './../pages/home-logged/home-logged';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    authService: AuthService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if(authService.isLogged()) {
        this.rootPage = HomeLoggedPage
      } else {
        console.log("None user authenticated.");
      }
    });
  }
}
