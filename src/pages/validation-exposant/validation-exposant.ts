import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { UserGlobal } from '../../models/infosUser.model';
import { NativeStorage } from '@ionic-native/native-storage';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';
import { TabsExposantPage } from '../tabs-exposant/tabs-exposant';
import { InfosProvider } from '../../providers/infos/infosUser';

@Component({
  selector: 'page-validation-exposant',
  templateUrl: 'validation-exposant.html'
})
export class ValidationExposantPage {

  infosUser:UserGlobal = new UserGlobal();
  idTransac: string = "5";
  resultat: string = "";
  hideResultat:boolean = true;
  solde: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public transactionsApiProvider: TransactionsApiProvider,
    private infosProvider: InfosProvider,
    private nativeStorage: NativeStorage
  ) {
    
    //RECUP IDTRANSAC FROM PREVIOUS PAGE
  }

  public validateTransacFromCom(){

      this.hideResultat = true;
    setTimeout(() => {
      return this.transactionsApiProvider.checkVendeur(this.idTransac,this.infosUser.token)
      .then(result => {
            
        if(result.data == "true"){
          
              this.transactionsApiProvider.giveMySoldeOnline(this.infosUser.token)
              .then( retour => {
                //Update solde
                this.solde = retour.data;
                this.infosProvider.saveSolde(this.solde)
                 this.resultat="Transaction validée";
                    this.hideResultat = false;
              })
              .catch(() => console.log("erreur recup solde"))
        }else{
          this.resultat="Transaction en attente";
            this.hideResultat = false;
        }
      })
      .catch(()=>console.log("erreur check vendeur"))
    }, 3000); 
  }

  public cancelVerif(){
    this.app.getRootNav().setRoot(TabsExposantPage)
  }

  ionViewCanEnter(){
    //Recup Infos
    this.nativeStorage.getItem('infosUser')
    .then( infos => {
      this.infosUser = infos as UserGlobal
      this.validateTransacFromCom();
    })
    .catch(() => console.log('erreur recup infos'))
  }
}
