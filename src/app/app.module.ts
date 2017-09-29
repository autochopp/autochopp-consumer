import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// App components
import { MyApp } from './app.component';
import { AlertComponent } from './alert/alert.component';

// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserRegisterPage } from './../pages/user-register/user-register';
import { HomeLoggedPage } from '../pages/home-logged/home-logged';

// Providers
import { UserService } from './user/user.service';
import { AuthService } from '../providers/auth-service/auth-service';

// Another ionic/angular components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, Http } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { Storage } from '@ionic/storage';


let storage = new Storage({});

/**
 * Global function to perform authenticated requests
 */
export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    // headerPrefix: YOUR_HEADER_PREFIX,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('token').then((token: string) => token)),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UserRegisterPage,
    HomeLoggedPage,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UserRegisterPage,
    HomeLoggedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    {provide: AuthHttp, useFactory: getAuthHttp,deps: [Http]}
  ]
})
export class AppModule {}
