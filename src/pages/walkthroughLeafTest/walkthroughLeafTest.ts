import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'walkthroughLeafTest.html',
  selector: 'walkthrough-leaftest'
})
export class WalkthroughLeafTestPage {

  constructor(private viewCtrl: ViewController) {
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}