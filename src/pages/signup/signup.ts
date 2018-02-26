import { Component } from '@angular/core';
import {ViewController} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {AlertController, LoadingController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'signup-modal',
  templateUrl: 'signup.html'
})
export class SignUpModalPage {

  postData = {}
  headers: any;
  msg: string;
  title: string;
  loader: any;
  
  constructor(public navCtrl:NavController, public http:HttpClient, public viewCtrl: ViewController, public alertCtrl: AlertController, public loading: LoadingController ) {
  }
  

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

  signUp(){
      this.headers = new Headers();
      this.headers.append('Content-Type','x-www-form-urlencoded');

      this.loader = this.loading.create({
        content: 'Signing in. Please wait...',
      });

      this.loader.present().then(() => {
        this.http.post<any>("http://192.168.22.5/api-user-create", this.postData, {headers: this.headers})
        .subscribe(res => {         
            if(res['id']){
                this.msg = 'Your account has been created. Please login to your account to continue';
                this.title = 'Success';
                this.showAlert();
            }
        }, (err) => {
          var status = JSON.parse(err['status']);
          if(status == 302){
            this.msg =  'The account already exist. Please login to your LeafCheckIT account or create another account';
            this.title = 'Error';
            this.showAlert();
          }else{
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

}