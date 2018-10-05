import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { UserGlobal } from '../../models/infosUser.model';
import { Keyboard } from '@ionic-native/keyboard';
import { NativeStorage } from '@ionic-native/native-storage';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';
import { TabsPage } from '../tabs/tabs';
import {InfosProvider} from '../../providers/infos/infosUser';
import { AppBddProvider } from '../../providers/app-bdd/app-bdd';

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
  idCom: string = "0";
  idTransac: number;
  pseudoCom: string = "inconnu";
  montant: number;
  resultat: string = "";
  hideResultat:boolean = true;
  solde: string = "";
  classVariable:string = "resultatRequeteWrong";

  constructor(
    public navCtrl: NavController,
    private app: App,
    public navParams: NavParams,
    private transactionsApiProvider: TransactionsApiProvider,
    private keyboard: Keyboard,
    public appBddProvider: AppBddProvider,
    private infosProvider: InfosProvider,
    private nativeStorage: NativeStorage
    ){
    this.idCom = navParams.get('idCom');
    this.pseudoCom = navParams.get('pseudoCom');
    this.idTransac = navParams.get('idTransac');
    this.montant = navParams.get('montant');
  }

    //Pattern qrCode: idVendeur-pseudoVendeur-idTransac-montant
    public validateTransacFromFest(){

    //recup code pin
    const CODEPIN = this.key1Input.value+this.key2Input.value+this.key3Input.value+this.key4Input.value;

    if(CODEPIN != this.infosUser.pass){
      this.classVariable = "resultatRequeteWrong"
      this.hideResultat = false;
      this.resultat = "Erreur code pin, nouvel essai";
      this.keyboard.hide();

      //Reset inputs + focus
      this.key1Input.value = "";
      this.key2Input.value = "";
      this.key3Input.value = "";
      this.key4Input.value = "";

      this.setInputFocus(1)
      // setTimeout(() => {
      // }, 1000);
      

    }else{  //Validation code pin
      
      //Sauvegarde en bdd locale
      this.appBddProvider.createTransac(this.idTransac,this.montant,this.pseudoCom);

      // => CheckClient

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
