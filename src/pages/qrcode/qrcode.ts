import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';

import { NativeStorage } from '@ionic-native/native-storage';
import { UserGlobal } from '../../models/infosUser.model';

import { Brightness } from '@ionic-native/brightness'

@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  public myQrCode: string = null;
  infosUser:UserGlobal = new UserGlobal();
  private oldBright:number = 0;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private connexionApiProvider: ConnexionApiProvider,
    private nativeStorage: NativeStorage,
    private brightness: Brightness
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
      //Recup Infos
      this.nativeStorage.getItem('infosUser')
      .then( infos => {
        this.infosUser = infos as UserGlobal
        this.myQrCode = '3-'+this.infosUser.pseudo
      })
      .catch(() => console.log('erreur recup infos'))
  }
  ionViewWillEnter(){
    this.brightness.getBrightness()
    .then( value => {
      this.oldBright = value
      this.brightness.setBrightness(1)
    })
    .catch(() => console.log("erreur brightness"))
  }

  ionViewWillLeave(){
    this.brightness.setBrightness(this.oldBright)
  }
}