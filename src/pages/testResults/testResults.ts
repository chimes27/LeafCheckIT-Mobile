import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NavController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoadingController, AlertController} from 'ionic-angular';



@Component({
	templateUrl: 'testResults.html',
  selector: 'testResults',
  })

export class TestResultsPage {
  public items:any;
  postData = {};
  category: string[];
  image: string[];
  dispData: any;
  flag: boolean;
  id: string[]; 
  headers: any;
  auth: any;
  	
    constructor(public navCtrl:NavController, public http:HttpClient, public storage:Storage, public loading: LoadingController, public alertCtrl: AlertController) {
      this.storage.get('auth').then((val) => {
          this.auth = val;
          this.flag = false;
          
          const headers = new HttpHeaders().set('Authorization', this.auth);
        this.headers = headers;

          let loader = this.loading.create({
            content: 'Loading content. Please wait...',
          });


          loader.present().then(() => {
        		this.http.get<any>("http://192.168.22.5/api-gettestResults", {headers: this.headers})
              .subscribe(data =>{

                this.category = data['category'];
                this.image = data['image'];
                this.id = data['id'];

                this.dispData = [];
                for(var i=0; i < this.category.length; i++){
                    this.dispData.push({category: this.category[i], image: this.image[i], id: this.id[i]});
                }
             loader.dismiss();
            },error=>{
               loader.dismiss();
               this.flag = true;
            });
        });
      }, (err) => {
        this.flag = true;
      });   
  }

  delete(id){
    let loader = this.loading.create({
            content: 'Requesting to server. Please wait...',
        });
    
    
  
    loader.present().then(()=>{
      this.http.post<any>("http://192.168.22.5/api-deleteTestResults", id , {headers: this.headers})
      .subscribe(data =>{
            console.log(data);
            loader.dismiss();
            if(data){
                this.showAlert("The image was successfully deleted.");
            }else{
            this.showAlert("Failure in deleting the image");
            }
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
            
        },(error)=>{
           loader.dismiss();
           this.showAlert("Error in deleting image. Check your internet connection"); 
        });

    });

  }

  showAlert(msg){
    let alert = this.alertCtrl.create({
      title: 'LeafCheckIT',
      subTitle: msg,
      buttons: ['OK']
    })
    alert.present();
  }

}

