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
import { AppBddProvider } from '../../providers/app-bdd/app-bdd';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * AFAIRE
 * MAJ SOLDE CLIENT HORS LIGNE
 * ENREGISTREMENT SQLITE TRANSACTION SI CLIENT HORS LIGNE
 * affichage last transaction si client hors ligne
 */


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  solde:string = 'Montant inconnu';
  lastTransac:TransactionGlobal = new TransactionGlobal();
  infosUser:UserGlobal = new UserGlobal();
    connected: string = "true";
  showLast:boolean = false;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public appBddProvider: AppBddProvider,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private transactionsApiProvider: TransactionsApiProvider,
    private nativeStorage: NativeStorage,
    private sqlite: SQLite
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
            //Suppr token
            this.connexionApiProvider.deleteToken();
            //Suppr DB
            this.sqlite.deleteDatabase({
              name: 'trobada_db',
              location: 'default'
            })
              .then(() => {
                this.app.getRootNav().setRoot(LoginPage);
              })
              .catch(e => console.log(e));
            
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

        if (this.connexionApiProvider.checkOnline()) { //Client ONLINE

          this.transactionsApiProvider.lastClientTransaction(this.infosUser.token)
          .then( transac => {
            this.lastTransac = JSON.parse(transac.data)
            })
          .catch(() => console.log('erreur recup transactions Online'))
        
        }else{  //Client OFFLINE
          // this.appBddProvider.recupLastTransac()
          // .then( transac => {

          //   this.lastTransac = JSON.parse(transac.data)

          //   //Affichage modifié
          //   this.connected = "false";
          //   this.showLast = true;
          // })
          // .catch(() => console.log('erreur recup transactions OFFLINE'))
        }
      })
      .catch(() => console.log('erreur recup infos'))
    })
    .catch(() => console.log('erreur recup solde'))
   }

}
