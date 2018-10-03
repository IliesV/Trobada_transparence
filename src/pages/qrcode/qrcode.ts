import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ConnexionApiProvider } from '../../providers/api/api.connexion';

import { NativeStorage } from '@ionic-native/native-storage';
import { UserGlobal } from '../../models/infosUser.model';

import { Brightness } from '@ionic-native/brightness';

import { ScannerFestivalierPage } from '../scanner-festivalier/scanner-festivalier';


@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html'
})
export class QrcodePage {

  public myQrCode: string = null;
  infosUser: UserGlobal = new UserGlobal();
  private oldBright: number = 0;
  solde: string = 'Montant inconnu';
  connected: string = "true";

  constructor(
    private alertCtrl: AlertController,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private nativeStorage: NativeStorage,
    private brightness: Brightness
  ) {

  }

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
            this.brightness.setBrightness(this.oldBright);
            this.connexionApiProvider.deleteToken();
            this.app.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  public goScan() {
    this.brightness.setBrightness(this.oldBright)
      .then(() => {
        this.app.getRootNav().setRoot(ScannerFestivalierPage);
      })
      .catch(() => console.log("erreur brightness"))
  }

  ionViewCanEnter() {
    //Recup etat connexion
    if (!this.connexionApiProvider.checkOnline()) {
      this.connected = "false";
    }
    //Recup Infos
    this.nativeStorage.getItem('infosUser')
      .then(infos => {
        this.infosUser = infos as UserGlobal;
        this.nativeStorage.getItem('solde')
          .then(retour => {
            this.solde = retour.solde;
            this.myQrCode = this.infosUser.id + '-' + this.infosUser.pseudo + '-' + this.solde + '-' + this.connected;
          })
          .catch(() => console.log('erreur recup solde'))
      })
      .catch(() => console.log('erreur recup infos'))
  }
  ionViewWillEnter() {
    this.brightness.getBrightness()
      .then(value => {
        this.oldBright = value
        this.brightness.setBrightness(1)
      })
      .catch(() => console.log("erreur brightness"))
  }
}
