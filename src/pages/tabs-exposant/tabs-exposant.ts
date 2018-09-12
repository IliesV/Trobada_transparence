import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabsExposantPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-exposant',
  templateUrl: 'tabs-exposant.html'
})
export class TabsExposantPage {

  homeExposantRoot = 'HomeExposantPage'
  dealExposantRoot = 'DealExposantPage'
  soldeExposantRoot = 'SoldeExposantPage'


  constructor(public navCtrl: NavController) {}

}
