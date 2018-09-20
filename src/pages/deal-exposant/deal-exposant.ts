import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';
import {TransactionProvider} from '../../providers/transaction/transaction';

import {LoginPage} from '../login/login';
import { ScanQrPage } from '../scan-qr/scan-qr';

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

  objet: string;
  qrdata: object;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private app: App,
    private transaction: TransactionProvider) {
      this.objet = this.navParams.get('objet');
  }

  private goScan(){
    this.navCtrl.push(ScanQrPage);
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
    
    console.log('ionViewDidLoad DealExposantPage');
    
    console.log(typeof(this.objet));
    if(this.objet != null){
      this.qrdata = this.objet.split("-",6);
      console.log(this.sommeTotale)
        let alert = this.alertCtrl.create({
          title: 'Bim bam boum',
          subTitle: this.qrdata[2] + " coute " + this.qrdata[3] + " €",
          buttons: ['OK']
        });
        alert.present();
    } 
  }

}
