import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { UserGlobal } from '../../models/infosUser.model';
import { Keyboard } from '@ionic-native/keyboard';
import { NativeStorage } from '@ionic-native/native-storage';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';
import { TabsPage } from '../tabs/tabs';
import {InfosProvider} from '../../providers/infos/infosUser';

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
  idCom: string = "0";
  idTransac: string = "0";
  pseudoCom: string = "inconnu";
  montant: string = "0";
  resultat: string = "";
  hideResultat:boolean = true;
  showResultat:boolean = false;
  solde: string = "";
  classVariable:string = "resultatRequeteWrong"

  constructor(
    public navCtrl: NavController,
    private app: App,
    public navParams: NavParams,
    private transactionsApiProvider: TransactionsApiProvider,
    private keyboard: Keyboard,
    private infosProvider: InfosProvider,
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

    //recup code pin
    const CODEPIN = this.key1Input.value+this.key2Input.value+this.key3Input.value+this.key4Input.value;

    if(CODEPIN != this.infosUser.pass){
      this.resultat = "Erreur code pin, nouvel essai";
      this.hideResultat = false;

      //Reset inputs + focus
      this.key1Input.value = "";
      this.key2Input.value = "";
      this.key3Input.value = "";
      this.key4Input.value = "";

      this.setInputFocus(1)

    }else{
      

      //Validation code pin => CheckClient

      return this.transactionsApiProvider.checkClient(this.idCom,this.pseudoCom,this.idTransac,this.montant,this.infosUser.token)
      .then( result => {
        if(result.data == "Transaction validée"){
          this.transactionsApiProvider.giveMySoldeOnline(this.infosUser.token)
          .then( retour => {
            //Update solde
            this.solde = retour.data;
            this.infosProvider.saveSolde(this.solde)
            .then(() => {
              this.classVariable = "resultatRequeteOk"
              this.hideResultat = false;
              this.resultat = result.data;
              this.showResultat = true;
              this.keyboard.hide();
            })
            .catch(() => console.log("erreur save sold"))
          })
          .catch(() => console.log("erreur recup solde"))
        }
      })
      .catch(err => console.log((err.error)))
    }
  }

  ionViewDidLoad()
  {
    this.setInputFocus(1);
  }

  public cancelPin(){
    this.app.getRootNav().setRoot(TabsPage)
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
          this.keyboard.hide();
          this.validateTransacFromFest();
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
