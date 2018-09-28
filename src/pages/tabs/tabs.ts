import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { TransactionsPage } from '../transactions/transactions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  infosUser = {};

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = TransactionsPage;

  constructor(private navParams: NavParams) {
  }
}
