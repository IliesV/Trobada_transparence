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
  resultat: string = "Transaction en attente";
  hideResultat:boolean = true;
  hideVerif:boolean = true;
  solde: string = "";
  timer;

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

  public startVerif(){
    var i = 0;

    this.timer = setInterval(() => {
      i++;
      console.log("start verif")
      this.validateTransacFromCom();
      if(i == 5 || (this.resultat == "Transaction validée")){
        clearInterval(this.timer);
      }
    }, 3000);

    this.hideVerif = true;
  }

  private validateTransacFromCom(){

      this.hideResultat = true;
      return this.transactionsApiProvider.checkVendeur(this.idTransac,this.infosUser.token)
      .then(result => {
            
        if(result.data == "true"){

          //Update message écran et solde
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
  }

  public cancelVerif(){
    this.app.getRootNav().setRoot(TabsExposantPage)
  }

  ionViewCanEnter(){
    //Recup Infos
    this.nativeStorage.getItem('infosUser')
    .then( infos => {
      this.infosUser = infos as UserGlobal
    })
    .catch(() => console.log('erreur recup infos'))
  }

  ionViewDidLoad(){
    this.startVerif();
  }
}
