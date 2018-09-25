//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable }   from '@angular/core';
import { HTTP } from '@ionic-native/http';
// RxJS
import 'rxjs/add/operator/toPromise';

import {ConnexionApiProvider} from '../../providers/api/api.connexion';


@Injectable()
export class TransactionsApiProvider {

    private token;

    constructor(
        private nativeStorage: NativeStorage,
        private http: HTTP,
        private connexionApiProvider:ConnexionApiProvider
        ) {
        
        }

        //Recup solde
        public giveMySolde() {

            const URL = 'http://trobadapi.ddns.info/api/solde'

            //Recup Token
            this.connexionApiProvider.getToken()
            .then(
                data => {
                this.token = data.token;
                this.http.setDataSerializer('JSON');
                this.http.get(URL, {}, {"Content-Type": "application/json","Authorization":"Bearer " + this.token})
                .then(
                    data => {
                        //Sauvegarde du solde en dur
                        this.nativeStorage.setItem('datas',{solde: data.data})
                    })
                .catch(error => {
                    console.log(error.error)
                        })
                })
            .catch(error => console.log('erreur token'))
        }
}
