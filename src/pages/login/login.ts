import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import {AlertController, LoadingController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'login-modal',
  templateUrl: 'login.html'
})
export class LoginModalPage {

    postData = {}
    flag: boolean;
    headers: any;
    loader: any;
    msg: string;
    title: string;

	constructor(private viewCtrl: ViewController, public navCtrl:NavController, public http:HttpClient, public alertCtrl: AlertController, public storage: Storage, public navParams: NavParams, public loading: LoadingController) {
	}

  

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  login(){
      this.headers = new Headers();
      this.headers.append('Content-Type','x-www-form-urlencoded');

      this.loader = this.loading.create({
        content: 'Logging in. Please wait...',
      });

      this.loader.present().then(() => {
        this.http.post<any>("http://192.168.22.5/api-token-auth", this.postData, {headers: this.headers})
        .subscribe(res => {         
            console.log(res);
            var token = res['token'];
            var auth = "Token " + token;
            this.flag = true;
            this.saveToken(auth);
            this.title = "LeafCheckIT Login";
            this.msg = "Login Success! Welcome to LeafCheckIT!";
            this.showAlert();
        }, (err) => {
          var status = JSON.parse(err['status']);
          if(status == 302){
            this.loader.dismiss();
            this.msg =  'The account already exist. Please login to your LeafCheckIT account or create another account';
            this.title = 'Error';
            this.showAlert();
          }else{
            this.loader.dismiss();
            this.msg =  'Opps. An error occured. Please check youri nternet connectivity and try again..';
            this.title = 'Error';
            this.showAlert();
          }
          
        });
      });

  }
  showAlert(){
  	let alert = this.alertCtrl.create({
  	 	title: this.title,
  	 	subTitle: this.msg,
  	 	buttons: ['OK']
  	})
      alert.present();
      this.loader.dismiss();
  }

  saveToken(auth){
        this.storage.set('auth', auth);
        this.storage.set('flag', this.flag);
    }

}