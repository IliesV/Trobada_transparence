import { Injectable }   from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';
// RxJS
import 'rxjs/add/operator/toPromise';



@Injectable()
export class TransactionsApiProvider {

    constructor(
        private http: HTTP
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

    //CheckTransac from client
    public checkClient(idCom: string, pseudoCom: string, idTransac: string, montant: string, token:string): Promise<any> {
        const URL = 'http://trobadapi.ddns.info/api/checkClient'
        this.http.setDataSerializer('JSON');
        return this.http.post(URL, {
            "id_com": idCom,
            "id_fest": 3, //SUPPR
            "pseudo": pseudoCom,
            "idTransac": idTransac,
            "events_id": 1, //SUPPR
            "montant": montant
        },
        {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token
        });
    }

    //CheckTransac from vendeur
    public checkVendeur(idTransac:string, token:string): Promise<any> {
        const URL = 'http://trobadapi.ddns.info/api/checkVendeur'
        this.http.setDataSerializer('JSON');
        return this.http.post(URL, {"idTransac": idTransac},
        {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token
        });
    }
}
