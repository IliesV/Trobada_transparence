import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home-exposant',
  templateUrl: 'home-exposant.html',
})
export class HomeExposantPage {

  infosUser = {};

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App) {
  }

  private logout(){
    console.log("merde")
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez vous vraiment vous déconnecter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.app.getRootNav().setRoot(LoginPage);
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeExposantPage');
  }

}
