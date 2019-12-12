import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SpCocukEklePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sp-cocuk-ekle',
  templateUrl: 'sp-cocuk-ekle.html',
})
export class SpCocukEklePage {
  check1 : boolean = null;
  check2 : boolean = null;
  check3 : boolean = null;
  check4 : boolean = null;
  check5 : boolean = null;
  check6 : boolean = null;
  check7 : boolean = null;
  check8 : boolean = null;

  identityNumber : String = "";
  isValid : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpCocukEklePage');
  }

  radioChecked(selected:boolean, model:boolean){
    model = selected;
  }



  checkIdentity(event){
    if(this.identityNumber.length>1){
      this.isValid = this.validateIdentityNumber(this.identityNumber);      
      if(!this.isValid){
        this.alertCtrl.create({title:'Hata',message:'Lütfen girmiş olduğunuz kimlik numarasını kontrol ediniz !',buttons:['OK']}).present();
      }
    }
  }

  validateIdentityNumber(identity){
    if(!identity)    
      return false;
    identity = identity.toString();
        var isEleven = /^[0-9]{11}$/.test(identity);
        var totalX = 0;
        for (var i = 0; i < 10; i++) {
            totalX += Number(identity.substr(i, 1));
        }
        var isRuleX = totalX % 10 == identity.substr(10, 1);
        var totalY1 = 0;
        var totalY2 = 0;
        for (var x = 0; x < 10; x += 2) {
            totalY1 += Number(identity.substr(i, 1));
        }
        for (var y = 1; y < 10; y += 2) {
            totalY2 += Number(identity.substr(i, 1));
        }
        var isRuleY = ((totalY1 * 7) - totalY2) % 10 == identity.substr(9, 0);
        return isEleven && isRuleX && isRuleY;
  }

}
