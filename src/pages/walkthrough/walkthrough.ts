import { Component } from '@angular/core';
import {ViewController, App} from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'walkthrough.html',
  selector: 'walkthrough'
})
export class WalkthroughModalPage {

  constructor(private viewCtrl: ViewController, private app:App) {
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
    this.app.getRootNav().setRoot(HomePage);
  }

}