import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ConnexionApiProvider } from '../../providers/api/api.connexion';
import { TransactionsApiProvider } from '../../providers/api/api.transactions';

import { NativeStorage } from '@ionic-native/native-storage';

import { UserGlobal } from '../../models/infosUser.model';
import { TransactionGlobal } from '../../models/api.transaction.model'

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  listeTransac: TransactionGlobal[] = new Array<TransactionGlobal>();
  infosUser: UserGlobal = new UserGlobal();
  connected: string = "true";

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private transactionsApiProvider: TransactionsApiProvider,
    private nativeStorage: NativeStorage
  ) { }

  public logout() {
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

  doRefresh(refresher) {
    this.prepareThePage()

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ionViewCanEnter() {
    this.prepareThePage()
  }

  prepareThePage(){
    if (this.connexionApiProvider.checkOnline()) { //Client ONLINE
      this.connected = "true";
      //Recup Infos
      this.nativeStorage.getItem('infosUser')
        .then(infos => {
          this.infosUser = infos as UserGlobal
          //Recup transaction
          this.transactionsApiProvider.giveMyTransactions(this.infosUser.token)
            .then(transac => {
              this.listeTransac = JSON.parse(transac.data)
            })
            .catch(() => console.log('erreur recup transactions'))
        })
        .catch(() => console.log('erreur recup infos'))

    } else {  //Client OFFLINE
      this.connected = "false";
    }
  }
}
