import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';

import { NativeStorage } from '@ionic-native/native-storage';

import { UserGlobal } from '../../models/infosUser.model';
import { TransactionGlobal } from '../../models/api.transaction.model'

@Component({
  selector: 'page-home-exposant',
  templateUrl: 'home-exposant.html',
})
export class HomeExposantPage {

  solde:string = 'Montant inconnu';
  lastTransac:TransactionGlobal = new TransactionGlobal();
  infosUser:UserGlobal = new UserGlobal();

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private transactionsApiProvider: TransactionsApiProvider,
    private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController
  ) {}

  public logout(){
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez vous vraiment vous déconnecter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {;
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
    //Recup Solde
    this.nativeStorage.getItem('solde')
    .then( retour => {
      this.solde = retour.solde
      //Recup Infos
      this.nativeStorage.getItem('infosUser')
      .then( infos => {
        this.infosUser = infos as UserGlobal
        this.searchLastTransac();
      })
      .catch(() => console.log('erreur recup infos'))
    })
    .catch(() => console.log('erreur recup solde'))
   }


  searchLastTransac(){
    //Recup transaction
    let loading = this.loadingCtrl.create({
      content: 'Mise à jour...'
    });
  
    loading.present();

    this.transactionsApiProvider.lastVendeurTransaction(this.infosUser.token)
    .then( transac => {
      this.lastTransac = JSON.parse(transac.data)
      loading.dismiss();
    })
    .catch(() => {
      console.log('erreur recup transactions')
      loading.dismiss();
    })
  }
}
