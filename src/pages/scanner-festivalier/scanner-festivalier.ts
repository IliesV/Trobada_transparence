import { Component } from '@angular/core';
import { NavController, NavParams, App} from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ValidationFestivalierPage } from '../validation-festivalier/validation-festivalier';
import { ValidationOfflinePage } from '../validation-offline/validation-offline';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-scanner-festivalier',
  templateUrl: 'scanner-festivalier.html',
})
export class ScannerFestivalierPage {


  qrdata: string;
  objet: string;
  source: string;
  festivalier: string;
  statusConnect: string;
  montant: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    private qrScanner: QRScanner
  ) {
    this.statusConnect = navParams.get('statusConnect');
  }

  //Pattern qrCode: idVendeur-pseudoVendeur-idTransac-montant

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewWillEnter(){
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
           if(this.statusConnect == "true"){ //Client connecté => validation code pin

            this.app.getRootNav().setRoot(ValidationFestivalierPage,{ objet: this.objet});

           }else{

            //Recup du montant de la transac
            const DATASARRAY =text.split("-");
            this.montant = parseFloat(DATASARRAY[3]);
            this.app.getRootNav().setRoot(ValidationOfflinePage,{ montant: this.montant});

           }

          });
        } else if (status.denied) {
          console.log('Camera permission denied');
        } else {
          console.log('Permission denied for this runtime.');
        }
      })
      .catch((e: any) => console.log('Error is', e));
}

public cancelScan(){
  this.app.getRootNav().setRoot(TabsPage)
}

 ionViewWillLeave(){
    this.hideCamera(); 
 }

}
