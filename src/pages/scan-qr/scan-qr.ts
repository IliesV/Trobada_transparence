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

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrPage');
  }


  
  ionViewWillEnter(){
    console.log(this.source)
    if(this.source == "article"){
    this.showCamera();
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log('Camera Permission Given');
          this.qrScanner.show();
           let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  
           console.log('Scanned something', text);
           this.objet = text;
           this.qrScanner.hide();
           scanSub.unsubscribe(); 
          console.log('tout marche' + this.objet);
          this.transaction.addInfos(text);
          this.navCtrl.push(DealExposantPage, { objet: this.objet})
          });
        
  
          
          
        } else if (status.denied) {
          console.log('Camera permission denied');
        } else {
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));

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
          this.transaction.addInfos(text);
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
    this.hideCamera(); 
 }

}
