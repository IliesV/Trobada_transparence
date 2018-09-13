import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';


import {LoginPage} from '../login/login';

/**
 * Generated class for the DealExposantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deal-exposant',
  templateUrl: 'deal-exposant.html',
})
export class DealExposantPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private app: App,
  ) {
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

  goScanner(){
    this.navCtrl.push('page-scanner')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealExposantPage');
  }

}
