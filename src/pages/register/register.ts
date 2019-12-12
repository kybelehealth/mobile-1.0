import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterRequest } from '../../entity/account/register';
import { Platform } from 'ionic-angular/platform/platform';
import { AccountProvider } from '../../providers/account';
import { CheckInfoRequest } from '../../entity/account/checkInfo';
import { CommonProvider } from '../../providers/common';
import { LoginResponse } from '../../entity/account/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  translation : any = {};
  frmFirst : FormGroup;
  frmLast : FormGroup;

  isFirstStep=true;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  
  gender : string = "";

  constructor(public navCtrl: NavController,
    private formBuilder:FormBuilder,
    private accountProvider:AccountProvider,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private commonProvider:CommonProvider,
    private platform : Platform) {
  
      this.frmFirst = this.formBuilder.group({
        mobile : new FormControl('',Validators.compose([Validators.required,Validators.minLength(17),Validators.maxLength(17)])),
        password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)])),
        rePassword : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)]))
      },{validator:this.matchingPasswords('password','rePassword')});

      this.frmLast = this.formBuilder.group({
        lastname : new FormControl('',Validators.required),
        firstname : new FormControl('',Validators.required),
        birthdate : new FormControl('',Validators.required),
        gender : new FormControl(''),
        job:new FormControl(''),
        email : new FormControl(''),
        address:new FormControl('')
      });

  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Register')[0];
    this.translation=translationSource.Translation;
    console.log(this.translation);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  
  changeStep() {
    let model : CheckInfoRequest = {
      Type : "MemberMobile",
      Value:this.frmFirst.value.mobile,
      Lang : MyApp.currentLanguage
    }
    let loading = this.loadingCtrl.create({ content : this.translation.lblLoading });
    loading.present();
    this.accountProvider.checkInfo(model).subscribe(result=>{
      loading.dismiss();
      if(result.HasError){
        this.alertCtrl.create({ title : result.Error.Title, message : result.Error.Message, buttons:[this.translation.btnOk] }).present();
      }else{
        this.isFirstStep=false;
      }
    });
  }

  login() {
    this.navCtrl.push("LoginPage");
  }

  register() {
    var model : RegisterRequest = {
      Mobile : this.frmFirst.value.mobile,
      Password : this.frmFirst.value.password,
      Photo : "",
      Lastname : this.frmLast.value.lastname,
      Firstname : this.frmLast.value.firstname,
      Birthdate : this.frmLast.value.birthdate,
      Gender : this.frmLast.value.gender,
      Job : this.frmLast.value.job,
      Email : this.frmLast.value.email,
      Address : this.frmLast.value.address,
      Platform : this.platform.is('android') ? "Android":"iOS",
      Lang :MyApp.currentLanguage
    };
    console.log(model);
    let checkEmail : CheckInfoRequest = {
      Type:"MemberEmail",
      Value : model.Email.toString(),
      Lang : MyApp.currentLanguage
    };
    let loading = this.loadingCtrl.create({content:this.translation.lblLoading});
    loading.present();
    this.accountProvider.checkInfo(checkEmail).subscribe(result=>{
      if(result.HasError){
        loading.dismiss();
        this.alertCtrl.create({ title:result.Error.Title,message:result.Error.Message,buttons:[this.translation.btnOk] }).present();
      }else{
        this.accountProvider.register(model).subscribe(regResult=>{
          loading.dismiss();
          if(regResult.HasError){
            this.alertCtrl.create({ title:regResult.Error.Title,message:regResult.Error.Message,buttons:[this.translation.btnOk] }).present();
          }else{
            let model : LoginResponse =regResult.Result as LoginResponse;  
            this.commonProvider.setMember(model).then((ex)=>{
              this.navCtrl.setRoot("WelcomeOnboardPage");
            });
          }
        });
      }
    });
  } 

}
