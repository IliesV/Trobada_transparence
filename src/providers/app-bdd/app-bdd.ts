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
    // public http: HttpClient,
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

        //Ajout des tables
        this.createTables();
      })
      .catch(e => console.log(e));
  }

  private createTables(): void {

    //Table ARTICLE
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `article` ( `idArticle` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', [])
      .then(() => {
        //Table FESTIVAL
        this.db.executeSql('CREATE TABLE IF NOT EXISTS "festival" ( `idFestival` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', [])
          .then(() => {
            //Table ROLE
            this.db.executeSql('CREATE TABLE IF NOT EXISTS "role" ( `roleId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL )', [])
              .then(() => {
                //Table USER
                this.db.executeSql('CREATE TABLE IF NOT EXISTS "user" ( `userId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` TEXT NOT NULL, `prenom` TEXT NOT NULL, `roleId` INTEGER NOT NULL, FOREIGN KEY(`roleId`) REFERENCES roleId )', [])
                  .then(() => {
                    //Table QRCODE_USER
                    this.db.executeSql('CREATE TABLE IF NOT EXISTS `qrcode_user` ( `qrUser_userId` INTEGER NOT NULL, `qrUser_festivalId` INTEGER NOT NULL, `qrUser_image` TEXT, PRIMARY KEY(qrUser_userId,qrUser_festivalId), FOREIGN KEY(`qrUser_userId`) REFERENCES userId, FOREIGN KEY(`qrUser_festivalId`) REFERENCES festivalId )', [])
                      .then(() => {
                        //Table TRANSACTION
                        this.db.executeSql('CREATE TABLE IF NOT EXISTS `transaction` ( `transactionId` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `quantite` INTEGER NOT NULL, `date_transaction` TEXT NOT NULL, `transaction_clientId` INTEGER NOT NULL, `transaction_articleId` INTEGER NOT NULL, `transaction_festivalId` INTEGER NOT NULL, `transaction_vendeurId` INTEGER NOT NULL, FOREIGN KEY(`transaction_clientId`) REFERENCES userId, FOREIGN KEY(`transaction_articleId`) REFERENCES articleId, FOREIGN KEY(`transaction_festivalId`) REFERENCES festivalId, FOREIGN KEY(`transaction_vendeurId`) REFERENCES userId )', [])
                          .then(() => {
                            //Table QRCODE_ARTICLE
                            this.db.executeSql('CREATE TABLE IF NOT EXISTS `qrcode_article` ( `qrArticle_articleId` INTEGER NOT NULL, `qrArticle_festivalId` INTEGER NOT NULL, `qrArticle_vendeurId` INTEGER NOT NULL, `prix_unitaire` NUMERIC NOT NULL, `qrArticle_image` TEXT, PRIMARY KEY(qrArticle_articleId,qrArticle_festivalId,qrArticle_vendeurId), FOREIGN KEY(`qrArticle_articleId`) REFERENCES articleId, FOREIGN KEY(`qrArticle_festivalId`) REFERENCES festivalId, FOREIGN KEY(`qrArticle_vendeurId`) REFERENCES userId )', [])
                              .then(() => console.log('Toutes les tables sont créées'))
                              .catch(e => console.log(e));
                          })
                          .catch(e => console.log(e));
                      })
                      .catch(e => console.log(e));
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

}
