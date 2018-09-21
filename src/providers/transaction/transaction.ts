//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TransactionProvider {

  sommeTotal: number = 0;
  panier: any[] = [];
  nomsArticles: string[] = [];
  prixArticles: number[] = [];
  idFestivalier: string;
  pseudoFestivalier: string;

  constructor(
    //public http: HttpClient
    ) {
    console.log('Hello TransactionProvider Provider');
  }

  public addPrix(number){
    this.sommeTotal += number
  }

  public addInfos(string){
    let infosArticle = string.split("-",6);
    this.panier.push(infosArticle);
    this.nomsArticles.push(infosArticle[2]);
    this.prixArticles.push(infosArticle[3]);
  }

  public infosFestivalier(string){
    let infosFestivalier = string.split("-",3);
    this.idFestivalier = infosFestivalier[0];
    this.pseudoFestivalier = infosFestivalier[1];
  }

}
