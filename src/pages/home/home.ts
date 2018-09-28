import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';

import { NativeStorage } from '@ionic-native/native-storage';

import { UserGlobal } from '../../models/infosUser.model';
import { TransactionGlobal } from '../../models/api.transaction.model'

//https://ionicframework.com/docs/theming/overriding-ionic-variables/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  solde:string = 'Montant inconnu';
  //listeTransac:TransactionGlobal[] = new Array<TransactionGlobal>();
  lastTransac:TransactionGlobal = new TransactionGlobal();
  infosUser:UserGlobal = new UserGlobal();

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private transactionsApiProvider: TransactionsApiProvider,
    private nativeStorage: NativeStorage
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
    //Recup Solde
    this.nativeStorage.getItem('solde')
    .then( retour => {
      this.solde = retour.solde
      //Recup Infos
      this.nativeStorage.getItem('infosUser')
      .then( infos => {
        this.infosUser = infos as UserGlobal
        //Recup transaction
        if(this.infosUser.role === "vendeur"){
          this.transactionsApiProvider.lastVendeurTransaction(this.infosUser.token)
          .then( transac => {
            this.lastTransac = JSON.parse(transac.data)
          })
          .catch(() => console.log('erreur recup transactions'))
        }else{
          this.transactionsApiProvider.lastClientTransaction(this.infosUser.token)
          .then( transac => {
            this.lastTransac = JSON.parse(transac.data)
          })
          .catch(() => console.log('erreur recup transactions'))
        }
      })
      .catch(() => console.log('erreur recup infos'))
    })
    .catch(() => console.log('erreur recup solde'))
   }
}
