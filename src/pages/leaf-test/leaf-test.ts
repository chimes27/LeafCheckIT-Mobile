import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import {NavController, AlertController, LoadingController, ModalController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { WalkthroughLeafTestPage } from '../walkthroughLeafTest/walkthroughLeafTest';
import {LeafTestResultPage} from '../leafTestResult/leafTestResult';

@Component({
  selector: 'page-leaf-test',
  templateUrl: 'leaf-test.html'
})

export class LeafTestPage {
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;
  public flag=false;
  imageLoaded: boolean;
  imageFlag: boolean;
  imageName: string;
  imageURL: string;
  loader: any;
  user: any;
  classifierResult: string;
  desc: string;
  img1: string;
  img2: string;
  img3: string;
  message: string;
  dispData: any;
  auth: any;

  images: string[][];

  postData={}
  options: any;
 
  constructor(private http:HttpClient, private camera: Camera, private navCtrl: NavController, private _DomSanitizer: DomSanitizer, public storage: Storage, public alertCtrl: AlertController, public loading: LoadingController, public modalCtrl: ModalController) {
    this.storage.get('flag').then((val) => {
        this.flag = val;
        this.imageFlag = val;
    });

    this.storage.get('user').then((val) => {
        this.user = val;
      });


    this.photoTaken = false;
  }

  openCamera(){
  	this.options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      saveToPhotoAlbum: true
    };
    this.cameraCapture();
  }

  openGallery(){
        this.options = {
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: false,
            saveToPhotoAlbum: true 
        };
        this.cameraCapture();
  }


 cameraCapture(){
    let loader = this.loading.create({
        content: 'Retrieving image. Please wait...',
      });
    
    loader.present().then(() => {

    this.camera.getPicture(this.options).then((imageData) => {
            this.imageName = imageData
            this.imageURL = 'data:image/jpeg;base64,' + imageData;
            this.photoTaken = true;
            this.loaded();
            this.photoSelected = false;
            }, (err) => {
                console.log(err);
            });
        }, (err) => {
            console.log(err);
        });
    loader.dismiss();  
 }

 upload(){
    if(this.flag == true && this.imageLoaded == true){
          this.storage.get('auth').then((val) => {
            this.auth = val;
            this.loader = this.loading.create({
              content: 'Uploading image. Please wait...',
            });
          
            this.loader.present().then(() => {
              this.transferData();
            }, (err) => {
              this.showAlert(err);
              this.loader.dismiss();
            });
            
       }, (err) => {
              var message = "Error authenticating to server. Please signup or login" + err;
              this.loader.dismiss();
              this.showAlert(message);
       });
    }
  }
 
  transferData(){

    const headers = new HttpHeaders().set('Authorization', this.auth);
    
    let formData = new FormData();
    formData.append('category', '1');
    formData.append('status', 'Y');
    formData.append('image', this.imageName);
    formData.append('user', this.user); 

    this.http.post<any>("http://192.168.22.5/api-imageUpload", formData, {headers: headers}).subscribe(res => {
      if(res){
        this.loader.dismiss();
        
        this.classifierResult = res['label'];
        this.desc = res['desc'];
        this.message = "The result is: " + this.classifierResult + '<br/>' + this.desc;
        this.img1 = res['img1'];
        this.img2 = res['img2'];
        this.img3 = res['img3'];
        this.dispData = [];

        this.dispData.push({classifierResult: this.classifierResult, desc: this.desc, img1: this.img1, img2: this.img2, img3: this.img3});

        
        this.navCtrl.push(LeafTestResultPage, {dispData: this.dispData});
      }else{
        this.loader.dismiss();
        var message = "Sorry not supported Image format. Please capture or select a new picture.";
        this.showAlert(message);
      }

    }, (err) => {
      var message = "Connection Error. Please check your internet connection"
      this.showAlert(message);
      this.loader.dismiss();
    });  
}

    

  loaded(){
    this.imageLoaded = true;
    this.imageFlag = false; 
  }

  showAlert(message){
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: message,
      buttons: ['OK']
    })
    alert.present();
  }


  resultAlert(message){
    let alert = this.alertCtrl.create({
        title: 'Classification Result',
        subTitle: message,
        buttons: ['OK']
      })
      alert.present();
    
  }

  presentWalkthroughModal(){
  let walkthroughModal = this.modalCtrl.create(WalkthroughLeafTestPage);
  walkthroughModal.present();
 }

 

}
