import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import {LoginPage} from '../login/login';

/**
 * Generated class for the SoldeExposantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solde-exposant',
  templateUrl: 'solde-exposant.html',
})
export class SoldeExposantPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
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
    console.log('ionViewDidLoad SoldeExposantPag2e');
  }

}
