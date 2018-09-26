//Native Storage
import { NativeStorage } from '@ionic-native/native-storage';

// Core components
import { Injectable }   from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { JwtHelper } from "angular2-jwt";

@Injectable()
export class InfosProvider {

    constructor(
        private nativeStorage: NativeStorage,
        private decoder:JwtHelper
        ) {}

//RECUP INFOS
    public giveInfosUser(): Promise<any> {
        return this.nativeStorage.getItem('infosUser')
    }

//SAUVEGARDE INFOS TOKEN + TOKEN
    public saveTokenInfos(token):Promise<any>{

        var objetToken = this.decoder.decodeToken(token);

        return this.nativeStorage.setItem('infosUser', {
            pseudo: objetToken.username,
            role: objetToken.roles[0],
            dateCreation: objetToken.iat,
            dateExpiration: objetToken.exp,
            token: token
        })
    }

//SAUVEGARDE SOLDE
    public saveSolde(montant):Promise<any>{
        console.log('sauvegarde solde')
        return this.nativeStorage.setItem('solde', {
            solde: montant
        })
    }

}