import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the SqlitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const DATABASE_NAME:string = 'trobada_db';

@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html',
})
export class SqlitePage {

  private db: SQLiteObject;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite
  ) {
    this.createDatabaseFile();
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
    this.db.executeSql('CREATE TABLE `article` ( `idArticle` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', {})
      .then(() => {
        this.db.executeSql('CREATE TABLE "festival" ( `idFestival` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SqlitePage');
  }

}
