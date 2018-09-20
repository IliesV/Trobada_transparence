// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the AppBddProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const DATABASE_NAME: string = 'trobada_db';

@Injectable()

export class AppBddProvider {

  private db: SQLiteObject;

  constructor(
    private sqlite: SQLite
  ) {
    console.log('Hello AppBddProvider Provider');
  }

  public createDatabaseFile(): void {

    console.log('fonction appelée')
    this.sqlite.create({
      name: DATABASE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('BDD créée');
        //Creation BDD
        this.db = db;
      })
      .catch(e => console.log(e));
  }

  //Tables pour le vendeur
  private createTablesForSeller(): void {

    //Table ARTICLE
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `article` ( `idArticle` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', [])
      .then(() => {
        //Table FESTIVAL
        this.db.executeSql('CREATE TABLE IF NOT EXISTS "festival" ( `idFestival` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', [])
          .then(() => {
            //Table TRANSACTION
            this.db.executeSql('CREATE TABLE IF NOT EXISTS `transaction` ( `transactionId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `quantite` INTEGER NOT NULL, `date_transaction` TEXT NOT NULL, `transaction_clientId` INTEGER NOT NULL, `transaction_articleId` INTEGER NOT NULL, `transaction_festivalId` INTEGER NOT NULL, `transaction_vendeurId` INTEGER NOT NULL, FOREIGN KEY(`transaction_clientId`) REFERENCES userId, FOREIGN KEY(`transaction_articleId`) REFERENCES articleId, FOREIGN KEY(`transaction_festivalId`) REFERENCES festivalId, FOREIGN KEY(`transaction_vendeurId`) REFERENCES userId )', [])
              .then(() => {
                //Table QRCODE_ARTICLE
                this.db.executeSql('CREATE TABLE IF NOT EXISTS `qrcode_article` ( `qrArticle_articleId` INTEGER NOT NULL, `qrArticle_festivalId` INTEGER NOT NULL, `qrArticle_vendeurId` INTEGER NOT NULL, `prix_unitaire` NUMERIC NOT NULL, `qrArticle_image` TEXT, PRIMARY KEY(qrArticle_articleId,qrArticle_festivalId,qrArticle_vendeurId), FOREIGN KEY(`qrArticle_articleId`) REFERENCES articleId, FOREIGN KEY(`qrArticle_festivalId`) REFERENCES festivalId, FOREIGN KEY(`qrArticle_vendeurId`) REFERENCES userId )', [])
                  .then(() => {
                    console.log('Toutes les tables sont créées');
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  //Tables pour le client
  private createTablesForClient(): void {

    //Table TRANSACTION
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `transaction` ( `transactionId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `quantite` INTEGER NOT NULL, `date_transaction` TEXT NOT NULL, `transaction_clientId` INTEGER NOT NULL, `transaction_articleId` INTEGER NOT NULL, `transaction_festivalId` INTEGER NOT NULL, `transaction_vendeurId` INTEGER NOT NULL, FOREIGN KEY(`transaction_clientId`) REFERENCES userId, FOREIGN KEY(`transaction_articleId`) REFERENCES articleId, FOREIGN KEY(`transaction_festivalId`) REFERENCES festivalId, FOREIGN KEY(`transaction_vendeurId`) REFERENCES userId )', [])
      .then(() => {
        console.log('Toutes les tables sont créées');
      })
      .catch(e => console.log(e));                    
  }

  //PROVISOIRE Add datas
  private addDatas(): void {

    this.db.executeSql('INSERT INTO `role` (roleId,nom) VALUES (1,\'Client\')', [])
    .then(() => {
      this.db.executeSql('INSERT INTO `role` (roleId,nom) VALUES (2,\'Vendeur\')', [])
      .then(() => {
        this.db.executeSql('INSERT INTO `user` (nom,prenom,roleId) VALUES (\'Ruquier\',\'Laurent\',2)', [])
        .then(() => {
          this.db.executeSql('INSERT INTO `user` (nom,prenom,roleId) VALUES (\'Drucker\',\'Michel\',1)', [])
          .then(() => console.log('Les données sont enregistrées'))
          .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }
}
