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
  idTransac: string = "0";
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
    this.idTransac = navParams.get('idTransac');
  }

  public startVerif(){
    this.hideResultat = true;
    var i = 0;

    this.timer = setInterval(() => {
      i++;
      console.log("start verif")
      this.validateTransacFromCom()
      .then(result => {
            
        if(result.data == "true"){
          clearInterval(this.timer);
          this.hideVerif = true;
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
          this.resultat="Transaction en attente, essai "+i+"/5";
          this.hideResultat = false;
          if(i == 5){
            clearInterval(this.timer);
            this.resultat="Transaction non validée";
            this.hideVerif =false;
          }
        }
      })
      .catch(()=>console.log("erreur check vendeur"))
    }, 3000);
  }

  private validateTransacFromCom(){

      this.hideResultat = true;
      return this.transactionsApiProvider.checkVendeur(this.idTransac,this.infosUser.token)
      
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
