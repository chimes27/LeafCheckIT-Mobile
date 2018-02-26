import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'leafTestResult',
  templateUrl: 'leafTestResult.html'
})

export class LeafTestResultPage {
  dispData: any;
  items: any;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param

    this.dispData = navParams.get('dispData');
    this.items = [];
    this.items = this.dispData[0];
    console.log(this.items);

  }

}
