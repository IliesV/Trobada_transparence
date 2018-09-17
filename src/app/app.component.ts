import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomeExposantPage} from '../pages/home-exposant/home-exposant';
import {LoginPage} from '../pages/login/login';
import {ConnexionApiProvider} from '../providers/api/api.connexion';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  token:string;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private connexionApiProvider:ConnexionApiProvider
    ) {

    platform.ready().then(() => {

      statusBar.styleDefault();

      //Check Token
      this.token = this.connexionApiProvider.getToken();
     
      if(this.token == undefined){  //Pas de Token -> LoginPage

        this.rootPage = LoginPage;

      }else{  //Token -> Ckeck Token et role

        this.rootPage = HomeExposantPage;

      }
      splashScreen.hide();

    });
  }
}
