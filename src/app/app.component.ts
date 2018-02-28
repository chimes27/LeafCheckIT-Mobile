import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage} from '@ionic/storage'

import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import {DeficiencyListPage} from '../pages/deficiency-list/deficiency-list'
import { LeafTestPage } from '../pages/leaf-test/leaf-test';
import { TestResultsPage } from '../pages/testResults/testResults';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home' },
      { title: 'Banana Leaf Deficiency', component: DeficiencyListPage, icon: 'ios-leaf' },
      { title: 'Account', component: AccountPage, icon: 'md-person' },
      { title: 'Leaf Test', component: LeafTestPage, icon: 'md-camera' },
      { title: 'Previous Test Result', component: TestResultsPage, icon: 'md-compass' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.set('flag', false);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
