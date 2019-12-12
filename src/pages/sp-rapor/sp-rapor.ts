import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HealthRecordItem } from '../../entity/member/healthRecord';
import { MemberProvider } from '../../providers/member';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-sp-rapor',
  templateUrl: 'sp-rapor.html',
})
export class SpRaporPage {
  memberId : number = 0;
  photoSelected : boolean = false;
  selectedPhoto : string ="";
  frmRecord : FormGroup;
  translation:any={};
  constructor(public navCtrl: NavController, 
    private actionSheetCtrl:ActionSheetController,
    private camera : Camera,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private memberProvider : MemberProvider,
    private formBuilder : FormBuilder,
    public navParams: NavParams) {

      this.memberId = navParams.get('memberId');

      this.frmRecord = this.formBuilder.group({
        Name:['',Validators.required],
        Photo:['',Validators.required]
      });


  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='My Health Records')[0];
    this.translation=translationSource.Translation;
  }

  call(){
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translation.lblReport,
      buttons: [{
        text: this.translation.lblTakePhoto,
        handler: () => {
          this.takePhoto(1);
        }
      }, {
        text: this.translation.lblFromGallery,
        handler: () => {
          this.takePhoto(0);
        }
      }, {
        text: this.translation.lblCancel,
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    actionSheet.present();
  }

  takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit : true,
      sourceType:sourceType,
      correctOrientation: true,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.selectedPhoto = 'data:image/jpeg;base64,' + imageData;
      this.frmRecord.controls['Photo'].setValue(this.selectedPhoto);
      this.photoSelected=true;
    }, (err) => {
      // Handle error
    });
  }

  saveRecord(){
    let loading = this.loadingCtrl.create({content:this.translation.lblLoading});
    loading.present();
    let model : HealthRecordItem = {
      Id:0,
      Date:'',
      MemberId : this.memberId,
      Name : this.frmRecord.value.Name,
      Photo : this.selectedPhoto
    };
    this.memberProvider.saveHealthRecord(model).subscribe((result)=>{
      loading.dismiss();
      //let alert = this.alertCtrl.create({title:'Hera',message:'Rapor yükleme işlemi tamamlandı',buttons:["OK"]});
      //alert.onDidDismiss(()=>{
        this.navCtrl.pop();
      //});
      //alert.present();
    });    
  }

}
