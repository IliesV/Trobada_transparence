import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeExposantPage } from './home-exposant';

@NgModule({
  declarations: [
    HomeExposantPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeExposantPage),
  ],
})
export class HomeExposantPageModule {}
