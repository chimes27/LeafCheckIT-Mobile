import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { WalkthroughModalPage } from '../walkthrough/walkthrough';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) {
  	
  }

presentWalkthroughModal(){
  let walkthroughModal = this.modalCtrl.create(WalkthroughModalPage);
  walkthroughModal.present();
}

}
