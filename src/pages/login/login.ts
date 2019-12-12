import { Component } from '@angular/core';
import { IonicPage, NavController,  LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountProvider } from '../../providers/account';
import { LoginRequest } from '../../entity/account/login';
import { CommonProvider } from '../../providers/common';
import { Platform } from 'ionic-angular/platform/platform';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  translation : any = {};
  frmLogin : FormGroup;
  constructor(public navCtrl: NavController,
    private accountProvider:AccountProvider,
    private commonProvider : CommonProvider,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private platform : Platform,
    private formBuilder:FormBuilder) {
      this.frmLogin = this.formBuilder.group({
        language : new FormControl(MyApp.currentLanguage,Validators.required),
        mobile : new FormControl('',Validators.compose([Validators.required,Validators.minLength(17),Validators.maxLength(17)])),
        password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)]))
      });
  }

  ionViewCanEnter() : boolean{
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Login')[0];
    if(translationSource && translationSource.Translation){
      this.translation = translationSource.Translation
      return true;
    }else{
      this.commonProvider.translation().subscribe((result)=>{
        MyApp.translationSource = result.Result;
        translationSource = MyApp.translationSource.filter(x=>x.Screen=='Login')[0];
        this.translation = translationSource.Translation;
        return true;
      });
    }
  }

  ionViewDidEnter(){
    
  }

  gotoPassword() {
    this.navCtrl.push("PasswortVergessenPage");
  }

  gotoRegister() {
    this.navCtrl.push("RegisterPage");
    //this.navCtrl.setRoot("WelcomeOnboardPage");
  }

  login(){
    let loading = this.loadingCtrl.create({content:this.translation.lblLoading});
    loading.present();
    let model : LoginRequest = {
      Mobile : this.frmLogin.value.mobile,
      Password : this.frmLogin.value.password,
      Lang : MyApp.currentLanguage
    };
    this.accountProvider.login(model).subscribe(result=>{
      loading.dismiss();
      if(result.HasError){
        this.alertCtrl.create({title:result.Error.Title,message:result.Error.Message,buttons:[this.translation.lblClose]}).present();
      }else{
        this.commonProvider.setMember(result.Result).then((ex)=>{
          this.navCtrl.setRoot(HomePage);
        });
      }
    });
  }
  change(selected){
    console.log(selected);
    if(selected=="English"){
      this.changeLanguage("en");
    }else if(selected=="Türkçe"){
      this.changeLanguage("tr");
    }else{
      this.changeLanguage("ar");
    }
  }
  
  setLoadingMessage(){
    switch (MyApp.currentLanguage) {
      case 'tr': MyApp.loadingMsg = "İşleminiz yapılırken, lütfen bekleyiniz.."; break;
      case 'ar': MyApp.loadingMsg = "يتم تنفيذ الأمر , لطفا انتظر"; break;
      default: MyApp.loadingMsg = "In progress, please wait."; break;
    }
  }
  
  changeLanguage(langCode){
    let loading = this.loadingCtrl.create({content:''});
    loading.present();
    this.commonProvider.setLanguage(langCode).then(()=>{
      MyApp.currentLanguage =langCode;
      this.setLoadingMessage();
      this.commonProvider.changeLanguage(langCode).then((result)=>{
        let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Login')[0];
        this.translation=translationSource.Translation;
        this.platform.setDir( MyApp.currentLanguage=="ar" ? "rtl" :"ltr" , true);
        loading.dismiss();
      });
    });  
  }


}
