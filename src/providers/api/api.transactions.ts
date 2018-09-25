//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable }   from '@angular/core';
import { HTTP } from '@ionic-native/http';
// RxJS
import 'rxjs/add/operator/toPromise';

import {ConnexionApiProvider} from '../../providers/api/api.connexion';
import {LoginPage} from '../../pages/login/login';


@Injectable()
export class TransactionsApiProvider {

    private baseUrl: string = 'http://trobadapi.ddns.info/login_check';
    token;
    rootPage:any;
    
    constructor(
        private nativeStorage: NativeStorage,
        private http: HTTP,
        private connexionApiProvider:ConnexionApiProvider
        ) {
        //Recup Token
        this.connexionApiProvider.getToken()
        .then(
            data => {
            this.token = data.token;
            })
        .catch(error => this.rootPage = LoginPage)
        }

        //Recup solde
        public giveMySolde() {

            const URL = 'http://trobadapi.ddns.info/api/solde'
            this.http.setDataSerializer('JSON');
            this.http.get(URL, {}, {'Content-Type': 'application/json','Authorization':'Bearer ' + this.token})
            .then(
                data => {
                    //Sauvegarde du solde en dur
                    this.nativeStorage.setItem('solde', data)
                    .then(
                        (solde) => {
                            console.log('Token sauvegarde');
                            return solde;
                        },
                        error => console.error('Error storing solde', error)
                    );
                return data;
                })
            .catch(error => this.rootPage = LoginPage)
            }
        }

}
