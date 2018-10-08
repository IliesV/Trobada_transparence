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

  objet: string = null;
  qrdata: object;
  nomsArticles: string[] = [];
  prixArticles: number[] = [];
  pseudo: string;
  quantity: number[] = [];
  sommeTotale: number = 0;
  nombre: number = 0;
  newIdTransac: number = 0;
  qrCode: string = "";
  soloButton: boolean = true;

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

  //Redirige sur la page du scanner en précisant que le code scanné sera celui d'un article.
  private goScan() {
    this.navCtrl.push(ScanQrPage, { source: "article" });
  }

  //Redirige sur la page du scanner en précisant que le code scanné sera celui d'un client.
  private goScanClient() {
    this.navCtrl.push(ScanQrPage, { source: "client" });
  }

  //Ré initialise toute la transaction.
  private reset() {
    this.transaction.reset(); //Ré initialise la transaction au sein du provider.
    //Ré initialise les valeurs de la transaction courante.
    this.nomsArticles = [];
    this.prixArticles = [];
    this.quantity = [];
    this.pseudo = null;
    this.soloButton = true;
  }

  //Incrémente la quantité d'un article dans une transaction grâce à son ID dans le tableau quantité.
  private addQuantity(number) {
    this.quantity[number]++;
    this.transaction.sommeTot();
  }

  //Décrémente la quantité d'un article dans une transaction grâce à son ID dans le tableau quantité.
  private removeQuantity(number) {
    if (this.quantity[number] > 1) {
      this.quantity[number]--;
      this.transaction.sommeTot();
    }
  }

  //Supprimer un article déja scanné de la liste depuis son nom.
  private remove(noms) {
    //Si l'article n'existe pas dans la liste, indexOf retourne "-1"
    let index = this.nomsArticles.indexOf(noms);

    //Si l'article est présent dans la liste, son index sera supérieur à -1.
    //On supprime alors toutes les propriétés à l'index de ce produit.
    if (index > -1) {
      this.nomsArticles.splice(index, 1);
      this.prixArticles.splice(index, 1);
      this.quantity.splice(index, 1);
    }
    //Si la suppression d'article s'effectue sur le dernier présent dans la liste
    //on ré initialise l'afichage à son état par défaut.
    this.transaction.sommeTot();
    if(this.nomsArticles[0] == null){
      this.soloButton = true;
    }
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
    if(this.nomsArticles[0] !== undefined){
      this.soloButton = false;
    }
    //Initialisation d'un tableau dans le quel sera stockés les propriétés des articles qu'il est
    //nécéssaire d'envoyer en BDD (l'id et la quantité).

    var articles = [];
    for (let i = 0; i < this.transaction.nomsArticles.length; i++) {
      var article = {
        "product_id": this.transaction.idArticles[i],
        "qty": this.transaction.quantity[i]
      }
      articles.push(article);
    }

    //Chaine de caractère en JSON contenant toute les données liées à une transaction à envoyer en
    //base de données. Inclut le tableau précédemment crée.
    var datasClient = {
      "amount": this.transaction.sommeTotale,
      "id_fest": this.transaction.idFestivalier,
      "id_com": this.transaction.idVendeur,
      "events_id": this.transaction.idFestoche,
      "isConnected": this.transaction.isConnected,
      "listeTransactions": articles
    }

    //Au chargement de la page, si l'utilisateur à scanné un QR code client, apparition d'une alerte
    //proposant de finaliser la transaction.
    if (this.pseudo != null) {
      let alert = this.alertCtrl.create({
        title: 'Confirmer la transaction',
        message: "Confirmez vous cette vente d'une valeur de " + this.sommeTotale + "€",
        buttons: [
          {
            //Si "Annuler" est pressé, fermeture de l'alerte.
            text: 'Annuler',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            //Si "Oui" est pressé, envoi de la requête sur l'API en fournissant les données récupérées
            //précédemment.
            text: 'Oui',
            handler: () => {

              this.transactionApi.sendTransactions(this.transaction.infosUser.token, datasClient)
                .then(retour => {
                  const DATAS = JSON.parse(retour.data)



                  if (DATAS.resultat == "true") { //Credit client suffisant

                    //Id de la nouvelle transaction
                    this.newIdTransac = DATAS.idTransac

                    //redirection vers qrcode vendeur
                    this.qrCode = this.transaction.idVendeur + "-" + this.transaction.pseudoVendeur + "-" + this.newIdTransac + "-" + this.transaction.sommeTotale;
                    
                    //Reset du provider
                    this.reset();
                    
                    this.app.getRootNav().setRoot(QrcodeExposantPage, { myQrCode: this.qrCode, idTransac: this.newIdTransac , statutConnection: this.transaction.isConnected});

                  } else {
                    let alert2 = this.alertCtrl.create({
                      title: 'Solde insuffisant',
                      subTitle: 'La transaction ne peut aboutir',
                      buttons: ['Annuler']
                    });
                    alert2.present();
                  }
                })
                .catch(() => console.log("erreur envoi transaction"))
            }
          }
        ]
      });
      alert.present();
      //Au chargement de la page, si l'utilisateur à scanné un qrcode d'article :
    } else if (this.objet != null) {
      this.qrdata = this.objet.split("-", 6);//Récupération et découpage des données contenues dans le QrCode.
      this.soloButton = false; //Changement de l'affichage.
        this.transaction.quantity.push(1);// Quantité de l'article scanné initialisée à 1.
        this.transaction.sommeTot();//Mise à jour de la somme totale de la transaction.
        //Création d'une alerte à but purement informatif.
        let alert = this.alertCtrl.create({
          title: 'Article scanné',
          subTitle: "1 X " + this.qrdata[2] + " coute " + this.qrdata[3] + " €",
          buttons: ['OK']
        });
        alert.present();
       }
      }
      }
