import { Injectable }   from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';
// RxJS
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TransactionsApiProvider {

    constructor(
        private http: HTTP,
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
}
