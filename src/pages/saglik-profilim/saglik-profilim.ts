import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-saglik-profilim',
  templateUrl: 'saglik-profilim.html',
})
export class SaglikProfilimPage {
  translation : any = {};
  
  constructor(public navCtrl: NavController) {
  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Health Profile')[0];
    this.translation=translationSource.Translation;
  }

  openCategory(categoryId){
    if(parseInt(categoryId)===4){
      this.navCtrl.push("SpCocukPage",{isRegister:false}); 
    }else{
      this.navCtrl.push('QuestionFormPage',{ categoryId : categoryId });
    }    
  }
  

  // kisisel() {
  //   this.navCtrl.push("SpKisiselSaglikPage");
  //   //SpKisiselSaglikPage
  // }

  // rapor() {
  //   this.navCtrl.push("SpRaporPage"); 
  // }
  
  // genel() {
  //   this.navCtrl.push("SpGenelPage"); 
  // }
  
  // yakin() {
  //   this.navCtrl.push("SpYakinPage"); 
  // }

  // hamilelik() {
  //   this.navCtrl.push("SpHamilelikPage"); 
  // }

  // cocuk() {
  //   this.navCtrl.push("SpCocukPage"); 
  // }

  // persantil(){
  //   this.navCtrl.push("SpPersantilPage");
  // }
  //assets/imgs/camera-area.svg

}
