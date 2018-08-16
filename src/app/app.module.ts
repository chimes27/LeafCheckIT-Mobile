import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WalkthroughModalPage } from '../pages/walkthrough/walkthrough';
import { SignUpModalPage } from '../pages/signup/signup';
import { LoginModalPage } from '../pages/login/login';
import {AccountPage} from '../pages/account/account';
import {DeficiencyListPage} from '../pages/deficiency-list/deficiency-list';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import {LeafTestPage} from '../pages/leaf-test/leaf-test';
import {LeafTestResultPage} from '../pages/leafTestResult/leafTestResult';
import { TestResultsPage } from '../pages/testResults/testResults';
import {WalkthroughLeafTestPage} from '../pages/walkthroughLeafTest/walkthroughLeafTest'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {Camera} from '@ionic-native/camera';
import {IonicImageViewerModule} from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WalkthroughModalPage,
    SignUpModalPage,
    LoginModalPage,
    AccountPage,
    DeficiencyListPage,
    ItemDetailsPage,
    LeafTestPage,
    LeafTestResultPage,
    TestResultsPage,
    WalkthroughLeafTestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WalkthroughModalPage,
    SignUpModalPage,
    LoginModalPage,
    AccountPage,
    DeficiencyListPage,
    ItemDetailsPage,
    LeafTestPage,
    LeafTestResultPage,
    TestResultsPage,
    WalkthroughLeafTestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
