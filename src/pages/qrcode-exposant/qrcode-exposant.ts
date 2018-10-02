import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {App} from 'ionic-angular';

import { Brightness } from '@ionic-native/brightness';
import { ValidationExposantPage } from '../validation-exposant/validation-exposant';

@Component({
  selector: 'page-qrcode-exposant',
  templateUrl: 'qrcode-exposant.html',
})
export class QrcodeExposantPage {

  public myQrCode: string = "Inconnu";
  private oldBright:number = 0;
  public idTransac = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private brightness: Brightness
    ) {
      this.myQrCode = navParams.get('myQrCode');
      this.idTransac = navParams.get('idTransac');
  }

  public goValidation(){
    this.brightness.setBrightness(this.oldBright)
    .then( () => {
      this.app.getRootNav().setRoot(ValidationExposantPage,{ idTransac: this.idTransac});
    })
    .catch(() => console.log("erreur brightness"))
  }

  ionViewWillEnter(){
    this.brightness.getBrightness()
    .then( value => {
      this.oldBright = value
      this.brightness.setBrightness(1)
    })
    .catch(() => console.log("erreur brightness"))
  }
}
