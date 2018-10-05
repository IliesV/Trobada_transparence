import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController,LoadingController  } from 'ionic-angular';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ConnexionApiProvider } from '../../providers/api/api.connexion';
import { TransactionsApiProvider } from '../../providers/api/api.transactions';

import { NativeStorage } from '@ionic-native/native-storage';

import { UserGlobal } from '../../models/infosUser.model';
import { TransactionGlobal } from '../../models/api.transaction.model'
import { AppBddProvider } from '../../providers/app-bdd/app-bdd';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  solde: string = 'Montant inconnu';
  lastTransac: TransactionGlobal = new TransactionGlobal();
  infosUser: UserGlobal = new UserGlobal();
  connected: string = "true";
  showLast: boolean = false;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public appBddProvider: AppBddProvider,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private transactionsApiProvider: TransactionsApiProvider,
    private nativeStorage: NativeStorage,
    private sqlite: SQLite,
    public loadingCtrl: LoadingController
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

  ionViewCanEnter() {
    //Recup Solde
    this.nativeStorage.getItem('solde')
      .then(retour => {
        this.solde = retour.solde
        //Recup Infos
        this.nativeStorage.getItem('infosUser')
          .then(infos => {
            this.infosUser = infos as UserGlobal
            this.searchLastTransacs();
          })
          .catch(() => console.log('erreur recup infos'))
      })
      .catch(() => console.log('erreur recup solde'))
  }

  searchLastTransacs(){
    //Recup transactions
    let loading = this.loadingCtrl.create({
      content: 'Mise à jour...'
    });
  
    loading.present();
  
     //Recup last transaction

     if (this.connexionApiProvider.checkOnline()) { //Client ONLINE

      this.transactionsApiProvider.lastClientTransaction(this.infosUser.token)
        .then(transac => {
          this.lastTransac = JSON.parse(transac.data)
          this.showLast = false;
          this.connected = "true";
          loading.dismiss();
        })
        .catch(() => {
          console.log('erreur recup transactions ONLINE')
          loading.dismiss();
        })

    } else {  //Client OFFLINE

      //Ouverture DB => SQLiteObject
      this.appBddProvider.openDB()
        .then((db: SQLiteObject) => {
          this.appBddProvider.recupLastTransac(db)
            .then(transac => {

              //Si BD vide
              if (transac.rows.length == 0) {
                this.showLast = true;
              } else {
                this.lastTransac = transac.rows.item(0) as TransactionGlobal
                //Affichage modifié
                this.showLast = false;
                this.connected = "false";
              }
              loading.dismiss();
            })
            .catch(() => {
              console.log('erreur recup transactions OFFLINE')
              loading.dismiss();
            })
        })
        .catch(e => console.log('erreur recup DB'));
    }
  }

}
