import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { ENV } from '@app/env';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChoppsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChoppsServiceProvider {

  constructor(public authHttp: AuthHttp) {
    console.log('Hello ChoppsServiceProvider Provider');
  }

  public getChopps(): Promise<any> {
    const getChopps = ENV.api + "/getchopps";
    
    return this.authHttp.get(getChopps).map(res => res.json()).toPromise();
  }
}
