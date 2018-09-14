import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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

  scannedCode = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner) {
      this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('topMoumoute')
      this.scannedCode = barcodeData.text;
    }, (err) => {
        console.log('Error: ', err);
    })
  }

  // showCamera() {
  //   (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  // }
  
  // hideCamera() {
  //   (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrPage tuu');
  }

}
