import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { HomeExposantPage } from '../home-exposant/home-exposant';
import { DealExposantPage } from '../deal-exposant/deal-exposant';
import { TransactionExposantPage } from '../transaction-exposant/transaction-exposant';
import { QrcodeExposantPage } from '../qrcode-exposant/qrcode-exposant';

@Component({
  selector: 'page-tabs-exposant',
  templateUrl: 'tabs-exposant.html'
})
export class TabsExposantPage {

  infosUser = {};

  homeExposantRoot = HomeExposantPage;
  dealExposantRoot = DealExposantPage;
  transactionExposantRoot = TransactionExposantPage;


  constructor(private navParams: NavParams) {
    // this.email = navParams.get('email')
  }
}
