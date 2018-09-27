import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  infosUser = {};

  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor(private navParams: NavParams) {
    // this.email = navParams.get('email')
  }
}
