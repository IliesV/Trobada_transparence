import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';

import { ConnexionApiGlobal } from '../../models/api.connexion.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public token:ConnexionApiGlobal;
  public dataToken:String;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    public connexionApiProvider:ConnexionApiProvider,
    ) {
      console.log('construct home');
      this.connexionApiProvider.login('michel','tutu',true)
      .then(retour => {
        this.token = retour;
        this.dataToken = this.token.token;
      })

  }

  private logout(){
    console.log("merde")
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez vous vraiment vous déconnecter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.app.getRootNav().setRoot(LoginPage);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }




}
