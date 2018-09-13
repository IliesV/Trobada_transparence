import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner
    ) {
  }

  ionViewWillEnter(){
    this.showCamera();

        // Optionally request the permission early
        this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted
        
        
            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);
        
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            });
        
          } else if (status.denied) {
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            // permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        })
        .catch((e: any) => console.log('Error is', e));
 }
 ionViewWillLeave(){
    this.hideCamera(); 
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannerPage');
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

}
