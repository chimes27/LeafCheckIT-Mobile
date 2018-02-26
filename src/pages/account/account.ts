import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { LoginModalPage } from '../login/login';   
import { SignUpModalPage } from '../signup/signup'; 
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

export class AccountPage {
  public items: any;
  public details: any;
  public flag=false;
  public message: string;
  public status: any;
  public user: any;
  headers: any;

  constructor(public modalCtrl: ModalController, public http:HttpClient, public storage: Storage, public navCtrl:NavController) {

    this.storage.get('flag').then((val) => {
        this.flag = val;
        if(this.flag == true){
          this.DisplayUser();
        }
    });
    
  }

  SignUp(){
    let modal = this.modalCtrl.create(SignUpModalPage);
    modal.present();
  }

  LogIn(){

  	var modal = this.modalCtrl.create(LoginModalPage, {enableBackdropDismiss: true});
    modal.onDidDismiss(data =>{
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    modal.present();
  }

  Logout(){
    this.storage.remove('auth');
    this.flag = false;
    this.storage.set('flag', this.flag);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.storage.remove('user');
  }

  DisplayUser(){
    this.storage.get('auth').then((val) => {
        const headers = new HttpHeaders().set('Authorization', val);
        this.http.get<any>("http://192.168.22.5/api-get-user", {headers})
        .subscribe(data => {
            this.details=[]

            this.details.push({
            email: data['email'],
            firstName: data['firstName'],
            lastName: data['lastName']
        })

          this.saveEmail(data['id'])
          this.flag = true;
        }, (err) => {
          console.log(err);
        });
    }, (err) => {
      this.flag = false;
    })
  }

  saveEmail(user){
    this.storage.set('user', user);
  }
  
}
