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

        //Verification validité token
        public checkTimeToken(token):boolean{
            return this.decoder.isTokenExpired(token);
        }

        //Delete TOKEN
        public deleteToken(){
            this.nativeStorage.clear()
            .then(
                () => console.log('Datas supprimees'),
                error => console.error('Error delete infosUser', error)
            );
        }

        //Refresh token
        public refreshToken(token):Promise<any> {
            return this.http.post(this.baseUrl, {"refresh_token": token}, {"Content-Type": "application/x-www-form-urlencoded"});
        }
}

//ngOnInit() {
//     this.moviePromiseService
//     .getService('api/Movie/TestGetNo')
//     .then(result => console.log(result))
//     .catch(error => console.log(error));
// }