import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {App} from 'ionic-angular';

import { DeconnexionProvider } from '../../providers/deconnexion/deconnexion';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private app: App,
    private deconnexionProvider: DeconnexionProvider
    ) {

  }

  private logout(){
   this.deconnexionProvider.logout();
  }

}
