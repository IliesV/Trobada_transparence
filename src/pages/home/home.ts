import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';
import { Platform } from 'ionic-angular';

import {LoginPage} from '../login/login';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  solde:string = 'Montant inconnu';

  constructor(
    platform: Platform,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private transactionsApiProvider: TransactionsApiProvider,
    private nativeStorage: NativeStorage
    ) {
      platform.ready().then(() => {
        this.transactionsApiProvider.giveMySolde();
        console.log("ready")
      })
    }

  public logout(){
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez vous vraiment vous déconnecter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.connexionApiProvider.deleteToken();
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }


  ionViewWillEnter(){
        this.nativeStorage.getItem('data')
        .then( retour => this.solde = retour.solde)
        .catch(error => console.log(error.error))
  }

}
