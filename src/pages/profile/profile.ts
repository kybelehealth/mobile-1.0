import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, ActionSheetController, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonProvider } from '../../providers/common';
import { MyApp } from '../../app/app.component';
import { MemberProvider } from '../../providers/member';
import { ProfileInfoRequest, ProfileInfoResponse } from '../../entity/member/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  frmProfile : FormGroup;
  translation:any={};
  gender : string = "";
  profileData : ProfileInfoResponse;
  profilePhoto : string = "assets/imgs/no-avatar.png";
  constructor(public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    private commonProvider : CommonProvider,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private modalCtrl : ModalController,
    private camera : Camera,
    private actionSheetCtrl:ActionSheetController,
    private memberProvider:MemberProvider) {
    
      let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Profile')[0];
      this.translation=translationSource.Translation;
      console.log(this.translation);
      this.frmProfile = this.formBuilder.group({
        lastname : new FormControl('',Validators.required),
        firstname : new FormControl('',Validators.required),
        birthdate : new FormControl('',Validators.required),
        gender : new FormControl(''),
        job:new FormControl(''),
        mobile : new FormControl(''),
        email : new FormControl(''),
        address:new FormControl('')
      });
  }

  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({content:MyApp.loadingMsg});
    loading.present();
    this.commonProvider.getMember().then(result=>{
      if(result && result.MemberId && result.MemberId>0){
        let request : ProfileInfoRequest = {
          MemberId : result.MemberId,
          Lang : MyApp.currentLanguage
        };
        this.memberProvider.profileInfo(request).subscribe((profileResponse)=>{
          loading.dismiss();
          console.log(profileResponse);
          if(profileResponse.HasError){
            let alert = this.alertCtrl.create({ title : profileResponse.Error.Title, message:profileResponse.Error.Message,buttons:["OK"] });
            alert.onDidDismiss(()=>{
              this.navCtrl.setRoot("LoginPage");
            });
            alert.present();
          }else{
            this.profileData = profileResponse.Result;
            this.frmProfile.controls["firstname"].setValue(profileResponse.Result.Firstname);
            this.frmProfile.controls["lastname"].setValue(profileResponse.Result.Lastname);
            let date = new Date(profileResponse.Result.Birthdate);
            this.frmProfile.controls["birthdate"].setValue(date.toISOString());
            this.frmProfile.controls["gender"].setValue(profileResponse.Result.Gender);
            this.gender=profileResponse.Result.Gender;
            this.frmProfile.controls["job"].setValue(profileResponse.Result.Job);
            this.frmProfile.controls["mobile"].setValue(profileResponse.Result.Mobile);
            this.frmProfile.controls["email"].setValue(profileResponse.Result.Email);
            this.frmProfile.controls["address"].setValue(profileResponse.Result.Address);
            this.profilePhoto = profileResponse.Result.ProfilePhoto;
          }
        });

      }else{
        loading.dismiss();
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }

  update(){
    let loading = this.loadingCtrl.create({content:this.translation.lblLoading});
    loading.present();
    let model : ProfileInfoResponse = {
      MemberId : this.profileData.MemberId,
      Address : this.frmProfile.value.address,
      Birthdate : this.frmProfile.value.birthdate,
      Email : this.frmProfile.value.email,
      Firstname : this.frmProfile.value.firstname,
      Gender : this.frmProfile.value.gender,
      Job : this.frmProfile.value.job,
      Lastname : this.frmProfile.value.lastname,
      Mobile : this.frmProfile.value.mobile,
      ProfilePhoto : this.profilePhoto
    };
    this.memberProvider.updateProfileInfo(model).subscribe(result=>{
      loading.dismiss();
      this.alertCtrl.create({title:'Hera', message:this.translation.lblSuccess,buttons:[this.translation.btnOk]}).present();
    });
  }

  logout() {
    this.commonProvider.clearMember().then((ex)=>{
      this.navCtrl.setRoot("LoginPage");
    });
  } 

  changePhoto(){
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translation.lblProfilePhoto,
      buttons: [{
        text: this.translation.btnTakePhoto,
        handler: () => {
          this.takePhoto(1);
        }
      }, {
        text: this.translation.btnFromGallery,
        handler: () => {
          this.takePhoto(0);
        }
      }, {
        text: this.translation.btnCancel,
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
      targetHeight:512,
      targetWidth:512,
      allowEdit : true,
      sourceType:sourceType,
      correctOrientation: true,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.profilePhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  open(type){
    var page = type == 'kvkk' ? "UserDataAggPage":"UserAggPage";
    let modal = this.modalCtrl.create(page,{onlyShow:true});
    modal.present();
  }

}
