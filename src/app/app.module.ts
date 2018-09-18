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
// import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';

import { NativeStorage } from '@ionic-native/native-storage';
import {ConnexionApiProvider} from '../providers/api/api.connexion';
import {HomeExposantPage} from '../pages/home-exposant/home-exposant';
import {LoginPage} from '../pages/login/login';

import { ConnexionApiGlobal } from '../models/api.connexion.model';
import { JwtHelper } from "angular2-jwt";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    HomeExposantPage,
    TabsExposantPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomeExposantPage,
    TabsPage,
    LoginPage,
    TabsExposantPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    HTTP,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppBddProvider,
    ConnexionApiProvider,
    ConnexionApiGlobal,
    JwtHelper
  ]
})
export class AppModule {}
