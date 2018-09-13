import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {HomePage} from '../home/home';
import {TabsPage} from '../tabs/tabs';
import {TabsExposantPage} from '../tabs-exposant/tabs-exposant';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const DATABASE_NAME:string = 'trobada_db';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    email: string;
    private db: SQLiteObject;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private sqlite: SQLite
  ) {
    this.createDatabaseFile();
  }

    private redirection(){
      if(this.email == "michel"){
        this.navCtrl.setRoot(TabsPage, {email: this.email});
      }else if(this.email == "laurent"){
        this.navCtrl.setRoot(TabsExposantPage, {email: this.email})
      }else{
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: 'Adresse mail erronée',
          buttons: ['Ok pardon']
        });
        alert.present();
      }
    }

      private createDatabaseFile(): void {

        this.sqlite.create({
          name: DATABASE_NAME,
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            console.log('BDD créée');
            //Creation BDD
            this.db = db;
            
            //Ajout des tables
            this.createTables();
          })
          .catch(e => console.log(e));
      }
    
      private createTables() : void {
    
        //Table 
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `article` ( `idArticle` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )',[])
          .then(() => {
            this.db.executeSql('CREATE TABLE IF NOT EXISTS "festival" ( `idFestival` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
