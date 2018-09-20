/*
* Connexion: requete API et check credentials ou token
*https://forum.ionicframework.com/t/adding-authorization-header-in-get-request/91222/8
*https://raw.githubusercontent.com/RedFroggy/ionic2-nfc-app/master/app/pages/login/login.service.ts
*/

//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable }   from '@angular/core';
// import { Http,Headers } from '@angular/http';
//import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//Model datas connexion
import { ConnexionApiGlobal } from '../../models/api.connexion.model';
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class ConnexionApiProvider {

    private baseUrl: string = 'http://trobadapi.ddns.info/login_check';
    token;
    role:string;
    pseudo:string;
    id:number;
    
    constructor(
        private nativeStorage: NativeStorage,
        private http: HTTP,
        private decoder:JwtHelper
        ) { }

        //CheckLogin
        public login(username:string,password:string):Promise<any> {
            console.log("Fonction login");
            this.http.setDataSerializer('JSON');

            const body = {
                username, password
            }
            const headers = new Headers(
                {
                    'Content-Type': 'application/json'
                });
            return this.http.post(this.baseUrl, {"username": username,"password":password}, {"Content-Type": "application/json"});
            //return this.http.post(this.baseUrl,body,{headers:headers})
        }


        //Sauvegarde du token
        public saveToken(token): any {

            this.nativeStorage.setItem('userToken', {
                token: token,
            })
            .then(
                () => console.log('Token sauvegarde'),
                error => console.error('Error storing item', error)
            );
        }

        //Recuperation Token
        public getToken() {
            this.nativeStorage.getItem('userToken')
            .then(
                data => {
                    console.log(data.token);
                    return data;
                },
                error => console.error(error)
            );
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
        public checkTimeToken(today,expiration):boolean{

            if(today > expiration){
                return true;
            }else{
                return false;
            }
        }
}

//ngOnInit() {
//     this.moviePromiseService
//     .getService('api/Movie/TestGetNo')
//     .then(result => console.log(result))
//     .catch(error => console.log(error));
// }