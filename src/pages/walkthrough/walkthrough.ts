import { Component } from '@angular/core';
//import { IonicPage} from 'ionic-angular';
import { HomePage } from '../home/home';
import { NavController, AlertController, ViewController } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';

//import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
  templateUrl: 'walkthrough.html',
  selector: 'walkthrough'
})
export class WalkthroughModalPage {
  msg: string;
  

  constructor(public app: App, public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  dismiss() {
    this.app.getRootNav().setRoot(HomePage).then(()=>{
    }).catch(err => {
      this.msg = err;
    });
    
   
  }


  showAlert(){
    let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: this.msg,
        buttons: ['OK']
      })
      alert.present();
    
  }

}