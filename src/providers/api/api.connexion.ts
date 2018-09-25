/*
* Connexion: requete API et check credentials ou token
*https://forum.ionicframework.com/t/adding-authorization-header-in-get-request/91222/8
*https://raw.githubusercontent.com/RedFroggy/ionic2-nfc-app/master/app/pages/login/login.service.ts
*/

//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable }   from '@angular/core';
import { HTTP } from '@ionic-native/http';
// RxJS
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

import { JwtHelper } from "angular2-jwt";

@Injectable()
export class ConnexionApiProvider {

    private baseUrl: string = 'http://trobadapi.ddns.info/login_check';
    token;
    
    constructor(
        private nativeStorage: NativeStorage,
        private http: HTTP,
        private decoder:JwtHelper
        ) { }

        //CheckLogin
        public login(username:string,password:string):Promise<any> {
            this.http.setDataSerializer('JSON');
            return this.http.post(this.baseUrl, {"username": username,"password":password}, {"Content-Type": "application/json"});
        }


        //Sauvegarde du token
        public saveToken(token): any {

            this.nativeStorage.setItem('userToken', {
                'token': token,
            })
            .then(
                () => console.log('Token sauvegarde'),
                error => console.error('Error storing item', error)
            );
        }

        //Recuperation Token
        public getToken() {
            return this.nativeStorage.getItem('userToken');
        }

        //Recup infos
        public getInfosUser(token){

            var objetToken = this.decoder.decodeToken(token);

            return {
                'pseudo': objetToken.username,
                'role': objetToken.roles[0],
                'dateCreation': objetToken.iat,
                'dateExpiration': objetToken.exp
            }
        }

        //Verification validité token
        public checkTimeToken(token):boolean{
            return this.decoder.isTokenExpired(token);
        }

        //Verification validité token
        public deleteToken(){
            this.nativeStorage.remove('userToken');
        }
}

//ngOnInit() {
//     this.moviePromiseService
//     .getService('api/Movie/TestGetNo')
//     .then(result => console.log(result))
//     .catch(error => console.log(error));
// }