//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserGlobal } from '../../models/infosUser.model';

@Injectable()
export class TransactionProvider {

  infosUser: UserGlobal = new UserGlobal();
  sommeTotale: number = 0;
  nomsArticles: string[] = [];
  prixArticles: number[] = [];
  idArticles: number[] = [];
  idFestivalier: string;
  idFestoche: string;
  idVendeur : string;
  pseudoFestivalier: string;
  pseudoVendeur: string;
  quantity: number[]= [];
  isConnected: string;

  constructor(
    //public http: HttpClient
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

    if (this.idFestoche == null){
      this.idFestoche = infosArticle[0] ;
    }
    if(this.nomsArticles.indexOf(infosArticle[2])== -1){
    this.nomsArticles.push(infosArticle[2]);
    this.prixArticles.push(infosArticle[3]);
    this.idArticles.push(infosArticle[1]);
    this.nativeStorage.getItem('infosUser')
    .then( infos => {
      this.infosUser = infos as UserGlobal
      this.idVendeur = this.infosUser.id;
      this.pseudoVendeur = this.infosUser.pseudo;
      console.log("isCom= "+this.infosUser.id);
    })
    .catch(() => console.log('erreur recup infos'))
  }else{
    this.quantity[this.nomsArticles.indexOf(infosArticle[2])]++;
  }

    
  }

  public addInfosFestivalier(string){
    let infosFestivalier = string.split("-",4);
    this.idFestivalier = infosFestivalier[0];
    this.pseudoFestivalier = infosFestivalier[1];
    this.isConnected = infosFestivalier[3];
  }

  public reset(){
    this.nomsArticles = [];
    this.prixArticles = [];
    this.quantity = [];
    this.sommeTotale = 0;
    this.pseudoFestivalier = null;
  }

}
