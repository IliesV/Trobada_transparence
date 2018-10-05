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
  selector: 'page-transaction-exposant',
  templateUrl: 'transaction-exposant.html',
})
export class TransactionExposantPage {

  listeTransac:TransactionGlobal[] = new Array<TransactionGlobal>();
  bufferListeTransac:TransactionGlobal[] = new Array<TransactionGlobal>();
  infosUser:UserGlobal = new UserGlobal();
  firstCheck:boolean = true;

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

    //Recup Infos
    this.nativeStorage.getItem('infosUser')
    .then( infos => {
      this.infosUser = infos as UserGlobal
      this.searchLastTransacs();
    })
    .catch(() => console.log('erreur recup infos'))
  }

  ionViewDidEnter(){
    if(!this.firstCheck){
      this.searchLastTransacs();
    }else{
      this.firstCheck = false;
    }
  }

  searchLastTransacs(){
    //Recup transactions
    let loading = this.loadingCtrl.create({
      content: 'Mise à jour...'
    });
  
    loading.present();
  
    this.transactionsApiProvider.giveMyTransactions(this.infosUser.token)
    .then( transac => {
      this.listeTransac = JSON.parse(transac.data)
      loading.dismiss();
    })
    .catch(() => {
      console.log('erreur recup transactions')
      loading.dismiss();
    })
  }

}


