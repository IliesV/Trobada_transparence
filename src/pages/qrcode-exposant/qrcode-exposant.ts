import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {App} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Brightness } from '@ionic-native/brightness';
import { ValidationExposantPage } from '../validation-exposant/validation-exposant';
import { TransactionsApiProvider } from '../../providers/api/api.transactions';
import { UserGlobal } from '../../models/infosUser.model';

@Component({
  selector: 'page-qrcode-exposant',
  templateUrl: 'qrcode-exposant.html',
})
export class QrcodeExposantPage {

  public myQrCode: string = "Inconnu";
  private oldBright:number = 0;
  public idTransac = "";
  private statutConnection = false;
  infosUser:UserGlobal = new UserGlobal();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private brightness: Brightness,
    private transactionApi: TransactionsApiProvider,
    private nativeStorage: NativeStorage
    ) {
      this.myQrCode = navParams.get('myQrCode');
      this.idTransac = navParams.get('idTransac');
      if(navParams.get('statutConnection') == "true"){
        this.statutConnection = true;
      }
  }

  public goValidation(){
    this.brightness.setBrightness(this.oldBright)
    .then( () => {

      if(this.statutConnection){  //Client connecté donc valide transaction

        this.app.getRootNav().setRoot(ValidationExposantPage,{ idTransac: this.idTransac});

      }else{  //User deconnecté donc vendeur valide transaction

        this.transactionApi.validateTransac(this.idTransac, this.infosUser.token)
        .then(()=> this.app.getRootNav().setRoot(ValidationExposantPage,{ idTransac: this.idTransac}))
        .catch(()=> console.log("erreur validation"))
      }
      
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

  ionViewCanEnter(){
    //Recup Infos
    this.nativeStorage.getItem('infosUser')
    .then( infos => {
      this.infosUser = infos as UserGlobal
    })
    .catch(() => console.log('erreur recup infos'))
  }
}
