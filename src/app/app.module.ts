import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';

//import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {HomeExposantPage} from '../pages/home-exposant/home-exposant';
import { DealExposantPage } from '../pages/deal-exposant/deal-exposant';
import { TransactionExposantPage } from '../pages/transaction-exposant/transaction-exposant';
import { TransactionsPage } from '../pages/transactions/transactions';
import { QrcodePage } from '../pages/qrcode/qrcode';

import { TabsExposantPage } from '../pages/tabs-exposant/tabs-exposant';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ScanQrPage } from '../pages/scan-qr/scan-qr';
import { GloablsProvider } from '../providers/gloabls/gloabls';
import { TransactionProvider } from '../providers/transaction/transaction';

import { SQLite } from '@ionic-native/sqlite';
import { AppBddProvider } from '../providers/app-bdd/app-bdd';
import { HTTP } from '@ionic-native/http';

import { NativeStorage } from '@ionic-native/native-storage';
import {ConnexionApiProvider} from '../providers/api/api.connexion';
import {TransactionsApiProvider} from '../providers/api/api.transactions';
import {LoginPage} from '../pages/login/login';
import {InfosProvider} from '../providers/infos/infosUser';

import { TransactionGlobal } from '../models/api.transaction.model';
import { EntitiesGlobal } from '../models/api.entities.model';
import { UserGlobal } from '../models/infosUser.model';

import { JwtHelper } from "angular2-jwt";

import { QRCodeModule } from 'angularx-qrcode';

import { Brightness } from '@ionic-native/brightness'


@NgModule({
  declarations: [
    MyApp,
    QrcodePage,
    HomePage,
    TabsPage,
    ScanQrPage,
    HomeExposantPage,
    TabsExposantPage,
    DealExposantPage,
    TransactionExposantPage,
    LoginPage,
    TransactionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QrcodePage,
    HomePage,
    HomeExposantPage,
    DealExposantPage,
    TransactionExposantPage,
    TabsPage,
    ScanQrPage,
    LoginPage,
    TabsExposantPage,
    TransactionsPage
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
    TransactionGlobal,
    EntitiesGlobal,
    UserGlobal,
    JwtHelper,
    QRScanner,
    GloablsProvider,
    TransactionProvider,
    TransactionsApiProvider,
    InfosProvider,
    Brightness
  ]
})
export class AppModule {}
