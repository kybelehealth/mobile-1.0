import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-passwort-vergessen',
  templateUrl: 'passwort-vergessen.html',
})
export class PasswortVergessenPage {

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  isenabled=false;
  resend=false;
  changepass=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswortVergessenPage');
  }

  sendCode() {
    this.resend=true;
  }

  resendCode() {
    this.isenabled=true;
    this.resend=true;
  }

  changePass() {
    this.changepass=true;
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  gotoLogin() {
    this.navCtrl.push("LoginPage");
  }

}
