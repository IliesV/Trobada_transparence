/*
* Connexion: requete API et check credentials ou token
*/

//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

// Models
// Importez vos models ici
@Injectable()
export class ConnexionApiProvider {

    private baseUrl: string = 'http://trobadapi.ddns.info/';
    token:string;
    role:string;
    pseudo:string;
    id:number;
    
    constructor(
        private http: Http,
        private nativeStorage: NativeStorage
        ) { }

        //Sauvegarde du token et infos sur le mobile
        public saveToken(token, role, pseudo, id): void {

            this.nativeStorage.setItem('userToken', {
                token: token,
                role: role,
                pseudo: pseudo,
                id:id
            })
            .then(
                () => console.log('Stored token!'),
                error => console.error('Error storing item', error)
            );
        }

        //Recuperation Token et infos
        public getToken():void {
            this.nativeStorage.getItem('userToken')
            .then(
                data => {
                    this.token = data.token,
                    this.role = data.role,
                    this.pseudo = data.pseudo,
                    this.id = data.id
                },
                error => {
                    console.error(error),
                    this.token = 'anonymous'
                }
            );
        }

    // public getObjects(): Promise<any> {
        
    //     return this.http.get(url)
    //     .toPromise()
    //     .then(response => response.json())
    //     .catch(error => console.log('Une erreur est survenue ' + error))
    // }

}