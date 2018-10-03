import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-validation-offline',
  templateUrl: 'validation-offline.html',
})
export class ValidationOfflinePage {

  montant: number;
  resultat: string = "Transaction validée";
  solde: number;

  constructor
    (public navCtrl: NavController,
    private app: App,
    public navParams: NavParams,
    private nativeStorage: NativeStorage
    ) {
    this.montant = navParams.get('montant');
  }

  ionViewCanEnter() {
    //Recup solde stocke sur l'appareil
    this.nativeStorage.getItem('solde')
      .then(retour => {
        this.solde = retour.solde - this.montant
      })
      .catch(() => console.log('erreur recup solde'))
  }

  public retour() {
    this.app.getRootNav().setRoot(TabsPage)
  }

}
