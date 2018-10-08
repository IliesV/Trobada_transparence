import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { DealExposantPage } from '../deal-exposant/deal-exposant';
import { TransactionProvider } from '../../providers/transaction/transaction';

/**
 * Generated class for the ScanQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

  qrdata: string;
  objet: string;
  source: string;
  festivalier: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private qrScanner: QRScanner,
    private transaction: TransactionProvider) {
      this.source = this.navParams.get('source')
  }

  //Lancement de la caméra de l'appareil.
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  //Fermetur de la caméra de l'appareil.
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrPage');
  }


  
  ionViewWillEnter(){
    //Lorsque la page va charger.
    console.log(this.source)
    //Si l'utilisateur décide de scanner un article et non un code client.
    if(this.source == "article"){
    this.showCamera(); //Lancement de la caméra.
    this.qrScanner.prepare()//Préparation du scanner de QRcode.
      .then((status: QRScannerStatus) => {
        if (status.authorized) { //Si l'utilisateur autorise l'application à utiliser l'appareil photo de son device :
          console.log('Camera Permission Given');
          this.qrScanner.show();//Lancement du scanner de qr.
           let scanSub = this.qrScanner.scan().subscribe((text: string) => {//Récupération des ifnos contenues dans le code.
  
           console.log('Scanned something', text);
           this.objet = text;
           this.qrScanner.hide();//Fermeture du scanner de QRCode
           scanSub.unsubscribe();
          console.log('tout marche' + this.objet);
          this.transaction.addInfos(text);//Envoi des données du code dans le provider.
          this.navCtrl.push(DealExposantPage, { objet: this.objet})//Redirection vers la page de transaction tout en envoyant les informations du code dedans.
          });
        
  
          
          //Si l'utilisateur refuse de laisser l'appli utiliser l'appareil photo.
        } else if (status.denied) {
          console.log('Camera permission denied');
        } else {
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));

  //Si l'utilisateur décide de scanner le code d'un client et non d'un article.
  }else if(this.source == "client"){
    console.log("scan client")
    this.showCamera();
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log('Camera Permission Given');
          this.qrScanner.show();
           let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  
           console.log('Scanned something', text);
           this.festivalier = text;
           this.qrScanner.hide();
           scanSub.unsubscribe(); 
          console.log('tout marche' + this.objet);
          this.transaction.addInfosFestivalier(text);
          this.navCtrl.push(DealExposantPage)
          });
        } else if (status.denied) {
          console.log('Camera permission denied');
        } else {
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
}


 ionViewWillLeave(){
   //Lorsque l'utilisateur va quitter la page.
    this.qrScanner.destroy();//Quitte complètement le qrScanner.
    this.hideCamera();//Quitte la caméra.
 }

}
