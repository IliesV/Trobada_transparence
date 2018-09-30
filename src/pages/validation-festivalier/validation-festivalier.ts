import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserGlobal } from '../../models/infosUser.model';
import { Keyboard } from '@ionic-native/keyboard';
import { NativeStorage } from '@ionic-native/native-storage';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';

@Component({
  selector: 'page-validation-festivalier',
  templateUrl: 'validation-festivalier.html',
})
export class ValidationFestivalierPage {
  @ViewChild('key1') key1Input;
  @ViewChild('key2') key2Input;
  @ViewChild('key3') key3Input;
  @ViewChild('key4') key4Input;

  infosUser:UserGlobal = new UserGlobal();
  datasString:string = "";
  password: string = '****';
  idCom: string = "0";
  idTransac: string = "0";
  pseudoCom: string = "inconnu";
  montant: string = "0";
  token:string = "";
  resultat: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transactionsApiProvider: TransactionsApiProvider,
    private keyboard: Keyboard,
    private nativeStorage: NativeStorage
    ){
    this.datasString = navParams.get('objet');
    const DATASARRAY = this.datasString.split("-");
    this.idCom = DATASARRAY[0];
    this.pseudoCom = DATASARRAY[1];
    this.idTransac = DATASARRAY[2];
    this.montant = DATASARRAY[3];
  }

  //Pattern qrCode: idVendeur-pseudoVendeur-idTransac-montant
  public validateTransacFromFest(){

    return this.transactionsApiProvider.checkClient(this.idCom,this.pseudoCom,this.idTransac,this.montant,this.infosUser.token)
    .then( result => {
      console.log(this.idCom+" "+this.pseudoCom+" "+this.idTransac+" "+this.montant)
      this.resultat = result.data;
    })
    .catch(() => console.log('erreur Verification'))
  }

  ionViewDidLoad()
  {
    this.setInputFocus(1);
  }

  public setInputFocus(key){

    switch (key){
      case 1:
        setTimeout(() => {
          this.key1Input.setFocus();
        },200)
        break;
      case 2:
        setTimeout(() => {
          this.key2Input.setFocus();
        },200)
        break;
      case 3:
        setTimeout(() => {
          this.key3Input.setFocus();
        },200)
        break;
      case 4:
        setTimeout(() => {
          this.key4Input.setFocus();
        },200)
        break;
      case 5:
        setTimeout(() => {
          this.keyboard.hide();
        },200)
        break;
      default:
        break;
    }
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
