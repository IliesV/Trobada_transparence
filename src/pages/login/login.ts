import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
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

    email: string = '';
    password: string = '';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public appBddProvider: AppBddProvider,
    private alertCtrl: AlertController,
    private infosProvider: InfosProvider,
    public connexionApiProvider:ConnexionApiProvider,
    private transactionsApiProvider:TransactionsApiProvider,
    public loadingCtrl: LoadingController
  ) {
    //Creation BDD
    this.appBddProvider.createDatabaseFile();
  }

  public submitLogin(){
    this.attentionOnline();
    console.log('Check credentials')

    let loading = this.loadingCtrl.create({
      content: 'Connexion...'
    });
  
    loading.present();

    this.connexionApiProvider.login(this.email,this.password)
    .then(response => {
      const TOKEN = JSON.parse(response.data).token;
      console.log(TOKEN)
      //Sauvegarde du token
      this.infosProvider.saveTokenInfos(TOKEN)
      .then(()=> {
        //recup solde
        this.transactionsApiProvider.giveMySoldeOnline(TOKEN)
        .then(data=> {
          //sauvegarde solde
          console.log("solde: "+data.data)
          this.infosProvider.saveSolde(data.data)
          .then(()=> {
            //Recup Role
            this.infosProvider.giveInfosUser()
            .then(infosUser => {
              loading.dismiss();
              console.log(JSON.stringify(infosUser))
              //Redirection
              if(infosUser.role == 'COM'){
                this.navCtrl.setRoot(TabsExposantPage)
              }else{
                this.navCtrl.setRoot(TabsPage);
              }
            })
            .catch(() => {
              console.log('erreur recup role')
              loading.dismiss();
            })
          })
          .catch(() => {
            console.log('erreur save solde')
            loading.dismiss();
          })
        })
        .catch(() => {
          console.log('erreur recup solde')
          loading.dismiss();
        })
      })
      .catch(() => {
        console.log('erreur sauvegarde token')
        loading.dismiss();
      })
    })
    .catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Erreur de connexion',
        subTitle: 'Vérifiez vos informations',
        buttons: ['Ok']
      });
      loading.dismiss();
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