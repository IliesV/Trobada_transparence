import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';

import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  solde:string = 'Montant inconnu';

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private nativeStorage: NativeStorage
    ) {

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

  ionViewCanEnter(){
    this.nativeStorage.getItem('solde')
    .then( retour => {
      this.solde = retour.solde
      console.log(this.solde)
    })
    .catch(error => console.log('erreur recup solde'))
   }


}
