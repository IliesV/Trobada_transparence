/*
* Connexion: requete API et check credentials ou token
*https://forum.ionicframework.com/t/adding-authorization-header-in-get-request/91222/8
*https://raw.githubusercontent.com/RedFroggy/ionic2-nfc-app/master/app/pages/login/login.service.ts
*/

//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable }   from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
//import { HttpClientModule } from '@angular/common/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
const BACKEND_URL:string = 'http://demo2726806.mockable.io/authenticate';

@Injectable()
export class ConnexionApiProvider {

    private baseUrl: string = 'http://trobadapi.ddns.info/';
    token:string;
    role:string;
    pseudo:string;
    id:number;
    
    constructor(
        //private http: HttpClientModule,
        private nativeStorage: NativeStorage,
        private http:Http
        ) { }

        //CheckLogin
        login(username:string,password:string,rememberMe:boolean):any{
            let headers = new Headers();
            headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
            return this.http.post(this.baseUrl+'login_check',JSON.stringify({login:username,password:password}),{headers:headers}).map((res:Response) => {
                            let loginData:any = res.json();
                            let user:User = this.readJwt(loginData.token);
        }
    }
        //Sauvegarde du token et infos sur le mobile
        public saveToken(token): any {

            this.nativeStorage.setItem('userToken', {
                token: token,
            })
            .then(
                () => console.log('token saves ='+token),
                error => console.error('Error storing item', error)
            );
        }

        //Recuperation Token et infos
        public getToken():string {
            this.nativeStorage.getItem('userToken')
            .then(
                data => {
                    this.token = data.token;
                    console.log('token recup');
                },
                error => console.error(error)
            );
            return this.token;
        }
}