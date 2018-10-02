//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import {InfosProvider} from '../../providers/infos/infosUser';
import { UserGlobal } from '../../models/infosUser.model';

@Injectable()
export class TransactionProvider {

  infosUser: UserGlobal = new UserGlobal();
  sommeTotale: number = 0;
  panier: any[] = [];
  nomsArticles: string[] = [];
  prixArticles: number[] = [];
  idArticles: number[] = [];
  idFestivalier: string;
  idFestoche: string;
  idVendeur : string;
  pseudoFestivalier: string;
  quantity: number[]= [];

  constructor(
    //public http: HttpClient
    private infosProvider: InfosProvider,
    private nativeStorage: NativeStorage
    ) {
    console.log('Hello TransactionProvider Provider');
  }

  public sommeTot(){
    this.sommeTotale = 0;
    for(let i=0; i<this.nomsArticles.length; i++ ){
        this.sommeTotale += (this.prixArticles[i]*this.quantity[i]);
    }
    console.log(this.sommeTotale + " sommetotale");
  }




  public addInfos(string){
    let infosArticle = string.split("-",6);
    this.panier.push(infosArticle);

    if (this.idFestoche == null){
      this.idFestoche = infosArticle[0] ;
    }
    this.nomsArticles.push(infosArticle[2]);
    this.prixArticles.push(infosArticle[3]);
    this.idArticles.push(infosArticle[1]);
    this.nativeStorage.getItem('infosUser')
    .then( infos => {
      this.infosUser = infos as UserGlobal
    })
    .catch(() => console.log('erreur recup infos'))
  this.idVendeur = this.infosUser.id;
  console.log(this.infosUser.id);
    
  }

  public addInfosFestivalier(string){
    let infosFestivalier = string.split("-",3);
    this.idFestivalier = infosFestivalier[0];
    this.pseudoFestivalier = infosFestivalier[1];
  }

  public reset(){
    console.log("stp");
    this.nomsArticles = [];
    this.prixArticles = [];
    this.panier = [];
    this.quantity = [];
    this.sommeTotale = 0;
  }

}
