import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { HomeExposantPage } from '../home-exposant/home-exposant';
import { DealExposantPage } from '../deal-exposant/deal-exposant';
import { SoldeExposantPage } from '../solde-exposant/solde-exposant';

@Component({
  selector: 'page-tabs-exposant',
  templateUrl: 'tabs-exposant.html'
})
export class TabsExposantPage {

  infosUser = {};

  homeExposantRoot = HomeExposantPage;
  dealExposantRoot = DealExposantPage;
  soldeExposantRoot = SoldeExposantPage;


  constructor(private navParams: NavParams) {
    // this.email = navParams.get('email')
  }
}
