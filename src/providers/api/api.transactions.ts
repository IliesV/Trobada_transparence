import { Injectable }   from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import {TransactionProvider} from '../../providers/transaction/transaction';
// RxJS
import 'rxjs/add/operator/toPromise';



@Injectable()
export class TransactionsApiProvider {

    private baseUrl: string = 'http://trobada-api.fabrique-beweb.com/api';

    constructor(
        private http: HTTP,
        private transaction: TransactionProvider
        ) {}

    //Recup solde API
    public giveMySoldeOnline(token):Promise<HTTPResponse> {

        const URL = this.baseUrl+'/solde'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Recup liste transaction
    public giveMyTransactions(token):Promise<HTTPResponse> {

        const URL = this.baseUrl+'/transactions'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Recup last transaction Vendeur
    public lastVendeurTransaction(token):Promise<HTTPResponse> {

        const URL = this.baseUrl+'/lastTransacVendeur'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Recup last transaction Client
    public lastClientTransaction(token):Promise<HTTPResponse> {
        
        const URL = this.baseUrl+'/lastTransacClient'
        this.http.setDataSerializer('JSON');
        return this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + token})
            
    }

    //Envoi de la transaction.
    public sendTransactions(token, datas):Promise<HTTPResponse> {

        const URL = this.baseUrl+'/addTransaction';
        this.http.setDataSerializer('JSON');
        return this.http.post(URL, datas, {"Content-Type": "application/json", "Authorization":"Bearer " + token});
    }

    //CheckTransac from client
    public checkClient(idCom: string, pseudoCom: string, idTransac: number, montant: number, token:string): Promise<any> {
        const URL = this.baseUrl+'/checkClient'
        this.http.setDataSerializer('JSON');
        return this.http.post(URL, {
            "id_com": idCom,
            "pseudo": pseudoCom,
            "idTransac": idTransac,
            "montant": montant
        },
        {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token
        });
    }

    //CheckTransac from vendeur
    public checkVendeur(idTransac:string, token:string): Promise<any> {
        const URL = this.baseUrl+'/checkVendeur'
        this.http.setDataSerializer('JSON');
        return this.http.post(URL, {"idTransac": idTransac},
        {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token
        });
    }

    //validate transaction from vendeur
    public validateTransac(idTransac:string, token:string): Promise<any> {
        const URL = this.baseUrl+'/validation'
        this.http.setDataSerializer('JSON');
        return this.http.post(URL, {"idTransac": idTransac},
        {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token
        });
    }
}
