import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class AppBddProvider {

  public db: SQLiteObject;

  constructor(
    private sqlite: SQLite
  ) { }

  public createDatabaseFile(): void {

    this.sqlite.create({
      name: 'trobada_db',
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

    //Table TRANSACTION_ENTRIES
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `transactions_entries` ( `id` INTEGER NOT NULL PRIMARY KEY, `products_id` INTEGER NOT NULL, `products_name` TEXT, `qty` INTEGER NOT NULL, `events_id` INTEGER NOT NULL )', [])
      .then(() => {
        //Table TRANSACTIONS
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `transactions` ( `id` INTEGER NOT NULL PRIMARY KEY, `amount` NUMERIC NOT NULL, `created_at` TEXT NOT NULL, `id_fest` INTEGER, `name_fest` TEXT, `id_com` INTEGER, `name_com` TEXT NOT NULL, `entities` INTEGER, `checked` INTEGER NOT NULL DEFAULT 0, FOREIGN KEY(`entities`) REFERENCES transactions_entries ( id ) )', [])

          .then(() => {
            console.log('Toutes les tables sont créées');
          })
          .catch(e => console.log(JSON.stringify(e)));
      })
      .catch(e => console.log(JSON.stringify(e)));
  }

  public createTransac(idTransac: number, montant: number, vendeur: string) {
    this.sqlite.create({
      name: 'trobada_db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        this.db = db;
        var dateTransac = Date.now()
        this.db.executeSql('INSERT INTO `transactions` (`id`,`amount`,`created_at`,`name_com`) VALUES (' + idTransac + ',' + montant + ',\'' + dateTransac + '\',\'' + vendeur + '\')', [])
          .then(() => console.log("Transac save"))
          .catch(e => console.log(JSON.stringify(e)));
      })

      .catch(e => console.log(JSON.stringify(e)));



  }

  public recupLastTransac() {
    this.sqlite.create({
      name: 'trobada_db',
      location: 'default'
    })
      .then(() => {
        return this.db.executeSql('SELECT * FROM transactions ORDER BY `created_at` LIMIT 1', [])
      })
      .catch(e => console.log(e));
  }

}
