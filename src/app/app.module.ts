import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsExposantPage } from '../pages/tabs-exposant/tabs-exposant';

import { SQLite } from '@ionic-native/sqlite';
import { AppBddProvider } from '../providers/app-bdd/app-bdd';
import { HttpClientModule } from '@angular/common/http';

import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TabsExposantPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TabsExposantPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppBddProvider
  ]
})
export class AppModule {}
