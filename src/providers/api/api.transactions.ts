import { Injectable }   from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import {TransactionProvider} from '../../providers/transaction/transaction';
// RxJS
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TransactionsApiProvider {

    constructor(
        private http: HTTP,
        private transaction: TransactionProvider
        ) {}

    //Recup solde API
    public giveMySoldeOnline(token):Promise<HTTPResponse> {

        const URL = 'http://trobadapi.ddns.info/api/solde'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Recup liste transaction
    public giveMyTransactions(token):Promise<HTTPResponse> {

        const URL = 'http://trobadapi.ddns.info/api/transactions'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Recup last transaction Vendeur
    public lastVendeurTransaction(token):Promise<HTTPResponse> {

        const URL = 'http://trobadapi.ddns.info/api/lastTransacVendeur'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Recup last transaction Vendeur
    public lastClientTransaction(token):Promise<HTTPResponse> {

        const URL = 'http://trobadapi.ddns.info/api/lastTransacClient'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Envoi de la transaction.
    public sendTransactions(token, datas):Promise<HTTPResponse> {

        // let articles: string = "";
        //     for(let i = 0; i<this.transaction.nomsArticles.length; i++){
        //         articles += "{"+
        //             'product_id:'+ this.transaction.idArticles[i] +','+
        //             'qty:'+ this.transaction.quantity[i]+
        //         "},"
        //     }
        //     articles = articles.slice(0, -1);

        // let datas = {
        //     "amount": this.transaction.sommeTotale,
        //     "id_fest": this.transaction.idFestivalier,
        //     "id_com": this.transaction.idVendeur,
        //     "events_id": this.transaction.idFestoche,
        //     "listeTransactions": [
        //         articles
        //     ]
        // }
        console.log(datas)
        const URL = 'http://trobadapi.ddns.info/api/addTransaction';
        this.http.setDataSerializer('JSON');
        return this.http.post(URL, datas, {"Content-Type": "application/json", "Authorization":"Bearer " + token});
            }
}
