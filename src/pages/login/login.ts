import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {TabsExposantPage} from '../tabs-exposant/tabs-exposant';

import { AppBddProvider } from '../../providers/app-bdd/app-bdd';

import {InfosProvider} from '../../providers/infos/infosUser';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';
import {TransactionsApiProvider} from '../../providers/api/api.transactions';

import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    email: string = 'michel';
    password: string = 'tutu';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public appBddProvider: AppBddProvider,
    private alertCtrl: AlertController,
    private infosProvider: InfosProvider,
    public connexionApiProvider:ConnexionApiProvider,
    private transactionsApiProvider:TransactionsApiProvider
  ) {
    //Creation BDD
    this.appBddProvider.createDatabaseFile();
  }

  public submitLogin(){
    this.attentionOnline();
    console.log('Check credentials')
    this.connexionApiProvider.login(this.email,this.password)
    .then(response => {
      const TOKEN = JSON.parse(response.data).token;
      //Sauvegarde du token
      this.infosProvider.saveTokenInfos(TOKEN)
      .then(()=> {
        //recup solde
        this.transactionsApiProvider.giveMySoldeOnline(TOKEN)
        .then(data=> {
          //sauvegarde solde
          this.infosProvider.saveSolde(data.data)
          .then(()=> {
            //Recup Role
            this.infosProvider.giveInfosUser()
            .then(infosUser => {
              //Redirection
              if(infosUser.role == 'vendeur'){
                this.navCtrl.setRoot(TabsExposantPage)
              }else{
                this.navCtrl.setRoot(TabsPage);
              }
            })
            .catch(() => console.log("erreur recup role"))
          })
          .catch(() => console.log('erreur save solde'))
        })
        .catch(() => console.log('erreur recup solde'))
      })
      .catch(() => console.log('erreur sauvegarde token'))
    })
    .catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Erreur de connexion',
        subTitle: 'Vérifiez vos informations',
        buttons: ['Ok']
      });
      alert.present();
    })
  }


ionViewDidEnter(){
  this.attentionOnline();
}

public attentionOnline(){
  if(!this.connexionApiProvider.checkOnline()){
    let alert = this.alertCtrl.create({
      title: 'Attention',
      subTitle: 'Une connexion à internet est indispensable',
      buttons: ['Ok']
    });
    alert.present();
  }
}
}
/*
.then(()=> {

})
.catch(() => console.log('erreur '))
*/