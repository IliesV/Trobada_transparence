import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//import {HomePage} from '../home/home';
import {TabsPage} from '../tabs/tabs';
import {TabsExposantPage} from '../tabs-exposant/tabs-exposant';

import {AppBddProvider} from '../../providers/app-bdd/app-bdd';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    email: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private appBddProvider: AppBddProvider,
    public connexionApiProvider:ConnexionApiProvider
  ) {
    // this.appBddProvider.createDatabaseFile();
  }

    private redirection(){

      if(this.email == "michel"){
        this.connexionApiProvider.saveToken('michelToken')
        this.navCtrl.setRoot(TabsPage, {email: this.email});
      }else if(this.email == "laurent"){

        this.navCtrl.setRoot(TabsExposantPage, {email: this.email})
      }else{
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: 'Adresse mail erronée',
          buttons: ['Ok pardon']
        });
        alert.present();
      }
    }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
