import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';
import {TransactionProvider} from '../../providers/transaction/transaction';

import {LoginPage} from '../login/login';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';

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
  nomsArticles: string[] = [];
  prixArticles: number[] = [];
  pseudo: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private connexionApiProvider: ConnexionApiProvider,
    private app: App,
    private transaction: TransactionProvider
    ) {
      this.objet = this.navParams.get('objet'),
      this.nomsArticles = this.transaction.nomsArticles,
      this.prixArticles = this.transaction.prixArticles,
      this.pseudo = this.transaction.pseudoFestivalier
  }

  private goScan(){
    this.navCtrl.push(ScanQrPage, {source: "article"});
}

private goScanClient(){
  this.navCtrl.push(ScanQrPage, {source: "client"});
}
  private logout(){
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

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad DealExposantPage');
    
    console.log(typeof(this.objet));
    if(this.objet != null){
      this.qrdata = this.objet.split("-",6);
      this.transaction.addPrix(parseFloat(this.qrdata[3]));
      //console.log(this.sommeTotale)
        let alert = this.alertCtrl.create({
          title: 'Bim bam boum',
          subTitle: this.qrdata[2] + " coute " + this.qrdata[3] + " €",
          buttons: ['OK']
        });
        alert.present();
    } 

    if(this.pseudo != null){
      let alert = this.alertCtrl.create({
        title: 'Confirm purchase',
        message: 'Do you want to buy this book?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Buy',
            handler: () => {
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
    }
    }

}
