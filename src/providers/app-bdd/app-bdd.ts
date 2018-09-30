import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import 'rxjs/add/operator/toPromise';

const DATABASE_NAME: string = 'trobada_db';

@Injectable()

export class AppBddProvider {

  private db: SQLiteObject;

  constructor(
    private sqlite: SQLite
  ) {}

  public createDatabaseFile():void {

    this.sqlite.create({
      name: DATABASE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        //Creation BDD
        this.db = db;
        this.createTables();
      })
      .catch(e => console.log(e));
  }

  //Tables
  private createTables(): void {

    //Table TRANSACTIONS
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `transactions_entries` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `products_id` INTEGER NOT NULL, `products_name` TEXT, `qty` INTEGER NOT NULL, `events_id` INTEGER NOT NULL )', [])
    .then(() => {
      //Table TRANSACTION_ENTRIES
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `transactions` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `amount` NUMERIC NOT NULL, `created_at` TEXT NOT NULL, `id_fest` INTEGER NOT NULL, `name_fest` TEXT NOT NULL, `id_com` INTEGER NOT NULL, `name_com` TEXT NOT NULL, `entities` INTEGER, `validated` INTEGER NOT NULL, FOREIGN KEY(`entities`) REFERENCES `transactions_entries`(`id`) )', [])
          .then(() => {
            console.log('Toutes les tables sont créées');
          })
          .catch(e => console.log(JSON.stringify(e)));
      })
      .catch(e => console.log(JSON.stringify(e)));
  }
}
