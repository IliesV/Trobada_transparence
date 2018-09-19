import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {TabsExposantPage} from '../pages/tabs-exposant/tabs-exposant';
import {LoginPage} from '../pages/login/login';
import {ConnexionApiProvider} from '../providers/api/api.connexion';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private connexionApiProvider:ConnexionApiProvider
    ) {

    platform.ready().then(() => {

      statusBar.styleDefault();

      //Check Token
      const TOKEN = this.connexionApiProvider.getToken();
      console.log('token saved = '+TOKEN)

      if(TOKEN == undefined){  //Pas de Token -> LoginPage

        this.rootPage = LoginPage;

      }else{  //Token -> Ckeck Token et role

        //Recuperation infos
        const INFOSUSER = this.connexionApiProvider.getInfosUser(TOKEN);

        //Validité token
        if(this.connexionApiProvider.checkTimeToken(INFOSUSER['dateCreation'],INFOSUSER['dateExpiration'])){

        //Redirection
          if(INFOSUSER['role'] == 'vendeur'){
            this.rootPage = TabsExposantPage;
          }else{
            this.rootPage = TabsPage;
          }
        
      }else{
      }
      //REGENERATION TOKEN

      }
      splashScreen.hide();

    });
  }
}
