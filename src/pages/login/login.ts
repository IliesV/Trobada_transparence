import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {TabsExposantPage} from '../tabs-exposant/tabs-exposant';

//import {AppBddProvider} from '../../providers/app-bdd/app-bdd';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';

import 'rxjs/add/operator/toPromise';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    email: string = 'michel';
    password: string = 'tutu';
    infosUser = {};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    //private appBddProvider: AppBddProvider,
    public connexionApiProvider:ConnexionApiProvider
  ) {
    // this.appBddProvider.createDatabaseFile();
  }

    public submitLogin(){
      
      this.connexionApiProvider.login(this.email,this.password)
      .then(
        response => {
            const TOKEN = JSON.parse(response.data).token;

            //Sauvegarde du token;
            this.connexionApiProvider.saveToken(TOKEN);

            //decodage token
            this.infosUser = this.connexionApiProvider.getInfosUser(TOKEN);

            //Redirection
            if(this.infosUser['role'] == 'vendeur'){
              this.navCtrl.setRoot(TabsExposantPage, {infosUser: this.infosUser})
            }else{
              this.navCtrl.setRoot(TabsPage, {infosUser: this.infosUser});
            }
        })
        .catch(error => 
          {
            console.log(error);
            let alert = this.alertCtrl.create({
              title: 'Erreur de connexion',
              subTitle: 'Vérifiez vos informations',
              buttons: ['Ok']
            });
            alert.present();
          })
    }
}
