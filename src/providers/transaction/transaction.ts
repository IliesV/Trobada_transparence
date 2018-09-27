//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TransactionProvider {

  sommeTotale: number = 0;
  panier: any[] = [];
  nomsArticles: string[] = [];
  prixArticles: number[] = [];
  idFestivalier: string;
  pseudoFestivalier: string;
  quantity: number[]= [];

  constructor(
    //public http: HttpClient
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
    this.nomsArticles.push(infosArticle[2]);
    this.prixArticles.push(infosArticle[3]);
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
