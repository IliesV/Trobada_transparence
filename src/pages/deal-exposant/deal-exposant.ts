import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';
import {TransactionProvider} from '../../providers/transaction/transaction';
import { Observable } from 'rxjs/Observable';

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
  quantity: number[] = [];
  sommeTotale: number = 0;
  nombre: number = 0;

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
      this.pseudo = this.transaction.pseudoFestivalier,
      this.quantity = this.transaction.quantity,
      this.sommeTotale= this.transaction.sommeTotale;
      
  }


  private goScan(){
    this.navCtrl.push(ScanQrPage, {source: "article"});
}

private goScanClient(){
  this.navCtrl.push(ScanQrPage, {source: "client"});
}

private reset(){
  this.transaction.reset();
  this.nomsArticles = [];
  this.prixArticles = [];
  this.quantity = [];
}

private addQuantity(number){
  this.quantity[number]++;
  console.log(this.quantity[number])
  this.transaction.sommeTot();
}

private removeQuantity(number){
  if(this.quantity[number] > 1){
  this.quantity[number]--;
  this.transaction.sommeTot();
}
}

private remove(noms){
  let index = this.nomsArticles.indexOf(noms);

  if(index > -1){
    this.nomsArticles.splice(index, 1);
    this.prixArticles.splice(index, 1);
    this.quantity.splice(index, 1);
  }
  this.transaction.sommeTot();
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
    
    
    if(this.pseudo != null){
      console.log("ok");
      let alert = this.alertCtrl.create({
        title: 'Confirmer la transaction',
        message: "Voulez vous prendre l'argent de "+ this.transaction.pseudoFestivalier,
        buttons: [
          {
            text: 'Surtout pas',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OUI',
            handler: () => {
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
    }else if(this.objet != null){
      this.qrdata = this.objet.split("-",6);
      this.transaction.quantity.push(1);
        let alert = this.alertCtrl.create({
          title: 'Bim bam boum',
          subTitle: this.qrdata[2] + " coute " + this.qrdata[3] + " €",
          buttons: ['OK']
        });
        alert.present();
    } 


    }

}
