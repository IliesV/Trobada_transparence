import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {TabsExposantPage} from '../tabs-exposant/tabs-exposant';

//import {AppBddProvider} from '../../providers/app-bdd/app-bdd';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';

import 'rxjs/add/operator/toPromise';
//import { resolve } from 'path';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

    private submitLogin(){
      
      console.log("Start login: "+this.email+" "+this.password);
      
      this.connexionApiProvider.login(this.email,this.password)
      .then(
        response => {
            console.log('Retour du token')
            const TOKEN = JSON.parse(response.data).token;

            //Sauvegarde du token
            console.log('Sauvegarde Token');
            this.connexionApiProvider.saveToken(TOKEN);

            //decodage token
            console.log('Decodeage Token = '+this.connexionApiProvider.getInfosUser(TOKEN));
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

      // try {
      //   console.log('retour token');
      //   this.token = this.connexionApiProvider.login(this.email,this.password);
      // }
      // catch(error) {
       
      // }
      

      
        // //console.log(this.token);
        // console.log('Decodage');
        // //decodage token
        // this.infosUser = this.connexionApiProvider.getInfosUser(this.token);

        // //Validité token

        // //PROVISOIREMENT
       

    }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
