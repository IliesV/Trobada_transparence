import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {TabsExposantPage} from '../tabs-exposant/tabs-exposant';

//import {AppBddProvider} from '../../providers/app-bdd/app-bdd';
import {ConnexionApiProvider} from '../../providers/api/api.connexion';



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
    token:string;
    infosUser = {};
    //PROVISOIREMENT
    role:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    //private appBddProvider: AppBddProvider,
    public connexionApiProvider:ConnexionApiProvider
  ) {
    // this.appBddProvider.createDatabaseFile();
  }

    private submitLogin(){

      this.connexionApiProvider.login(this.email,this.password)
      .then(retour => {
        
        //Recuperation token
        this.token = retour;

        //decodage token
        this.infosUser = this.connexionApiProvider.getInfosUser(this.token);

        //Validité token

        //PROVISOIREMENT
        this.role = 'vendeur';

        //Redirection
        if(this.role == 'vendeur'){
          this.navCtrl.setRoot(TabsExposantPage, {infosUser: this.infosUser})
        }else{
            this.navCtrl.setRoot(TabsPage, {infosUser: this.infosUser});
        }
      })
      .catch(error => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Erreur de connexion',
          subTitle: 'Vérifiez vos informations',
          buttons: ['Ok']
        });
        alert.present();
      })
    }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
