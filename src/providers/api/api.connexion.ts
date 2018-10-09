//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
// RxJS
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

import { JwtHelper } from "angular2-jwt";

import { Network } from '@ionic-native/network';

@Injectable()
export class ConnexionApiProvider {

    private baseUrl: string = 'http://trobada-api.fabrique-beweb.com';
    token;

    constructor(
        private nativeStorage: NativeStorage,
        private http: HTTP,
        private decoder: JwtHelper,
        private network: Network
    ) { }

    //Check connexion internet
    public checkOnline(): boolean {

        if (this.network.type === 'unknown' || this.network.type === 'none') {
            return false;
        } else {
            return true;
        }
    }

    //CheckLogin
    public login(username: string, password: string): Promise<any> {
        this.http.setDataSerializer('JSON');
        return this.http.post(this.baseUrl+"/login_check", { "username": username, "password": password }, { "Content-Type": "application/json" });
    }

    //Verification validité token
    public checkTimeToken(token): boolean {
        return this.decoder.isTokenExpired(token);
    }

    //Delete TOKEN
    public deleteToken() {
        this.nativeStorage.clear()
            .then(
                () => console.log('Datas supprimees'),
                error => console.error('Error delete infosUser', error)
            );
    }
}
