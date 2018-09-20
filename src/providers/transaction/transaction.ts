import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class TransactionProvider {

  sommeTotal: number

  constructor(public http: HttpClient) {
    console.log('Hello TransactionProvider Provider');
  }

  private addPrix(number){
    this.sommeTotal += number
  }

}
