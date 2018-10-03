import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { TransactionProvider } from '../../providers/transaction/transaction';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../login/login';
import { ConnexionApiProvider } from '../../providers/api/api.connexion';
import { TransactionsApiProvider } from '../../providers/api/api.transactions';

import { ScanQrPage } from '../scan-qr/scan-qr';
import { QrcodeExposantPage } from '../qrcode-exposant/qrcode-exposant';

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
  newIdTransac: number = 0;
  qrCode: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private connexionApiProvider: ConnexionApiProvider,
    private app: App,
    private transaction: TransactionProvider,
    private transactionApi: TransactionsApiProvider
  ) {
    this.objet = this.navParams.get('objet'),
      this.nomsArticles = this.transaction.nomsArticles,
      this.prixArticles = this.transaction.prixArticles,
      this.pseudo = this.transaction.pseudoFestivalier,
      this.quantity = this.transaction.quantity,
      this.sommeTotale = this.transaction.sommeTotale;

  }


  private goScan() {
    this.navCtrl.push(ScanQrPage, { source: "article" });
  }

  private goScanClient() {
    this.navCtrl.push(ScanQrPage, { source: "client" });
  }

private reset(){
  this.transaction.reset();
  this.nomsArticles = [];
  this.prixArticles = [];
  this.quantity = [];
  this.pseudo = null;
}

  private addQuantity(number) {
    this.quantity[number]++;
    this.transaction.sommeTot();
  }

  private removeQuantity(number) {
    if (this.quantity[number] > 1) {
      this.quantity[number]--;
      this.transaction.sommeTot();
    }
  }

  private remove(noms) {
    let index = this.nomsArticles.indexOf(noms);

    if (index > -1) {
      this.nomsArticles.splice(index, 1);
      this.prixArticles.splice(index, 1);
      this.quantity.splice(index, 1);
    }
    this.transaction.sommeTot();
  }

  private logout() {
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
    var articles = [];
    for (let i = 0; i < this.transaction.nomsArticles.length; i++) {
      var article = {
        "product_id": this.transaction.idArticles[i],
        "qty": this.transaction.quantity[i]
      }
      articles.push(article);
    }



    var trouduc = {
      "amount": this.transaction.sommeTotale,
      "id_fest": this.transaction.idFestivalier,
      "id_com": this.transaction.idVendeur,
      "events_id": this.transaction.idFestoche,
      "listeTransactions": articles
    }

    if (this.pseudo != null) {
      let alert = this.alertCtrl.create({
        title: 'Confirmer la transaction',
        message: "Confirmez vous cette vente d'une valeur de " + this.sommeTotale + "€",
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
              this.transactionApi.sendTransactions(this.transaction.infosUser.token, trouduc)
                .then(retour => {
                  const DATAS = JSON.parse(retour.data)

                  if (DATAS.resultat == "true") { //Credit client suffisant

                    this.reset();
                    this.newIdTransac = DATAS.idTransac
                    this.qrCode = this.transaction.idVendeur + "-" + this.transaction.pseudoVendeur + "-" + this.newIdTransac + "-" + this.transaction.sommeTotale;
                    this.app.getRootNav().setRoot(QrcodeExposantPage, { myQrCode: this.qrCode, idTransac: this.newIdTransac });

                  } else {
                    let alert2 = this.alertCtrl.create({
                      title: 'Solde insuffisant',
                      subTitle: 'La transaction ne peut aboutir',
                      buttons: ['Annuler']
                    });
                    alert2.present();
                  }
                })
                .catch(err => console.log(err.toString()))
            }
          }
        ]
      });
      alert.present();
    } else if (this.objet != null) {
      this.qrdata = this.objet.split("-", 6);
      this.transaction.quantity.push(1);
      this.transaction.sommeTot();
      let alert = this.alertCtrl.create({
        title: 'Article scanné',
        subTitle: "1 X " + this.qrdata[2] + " coute " + this.qrdata[3] + " €",
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
