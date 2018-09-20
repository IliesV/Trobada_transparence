import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';
//import { NavController } from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';

@Injectable()
export class DeconnexionProvider {
    
    constructor(
        // public navCtrl: NavController,
        // public navParams: NavParams,
        private alertCtrl: AlertController,
        //private nav: NavController
        private app: App
        ) { }

    public logout(){

        let alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Voulez vous vraiment vous déconnecter?',
            buttons: [{
                text: 'Annuler',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                    }
                },
                {
                text: 'Oui',
                handler: () => {
                    // this.nav.setRoot(LoginPage);
                    this.app.getRootNav().setRoot(LoginPage);
                    console.log('Buy clicked');
                }
            }]
        });
        alert.present();
    }
}