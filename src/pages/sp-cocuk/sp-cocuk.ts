import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { MemberProvider } from '../../providers/member';
import { ChildItem, ChildRequest } from '../../entity/member/child';
import { MyApp } from '../../app/app.component';
import { CommonProvider } from '../../providers/common';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@IonicPage()
@Component({
  selector: 'page-sp-cocuk',
  templateUrl: 'sp-cocuk.html',
})
export class SpCocukPage {
  isLoading : boolean = true;
  childList : ChildItem[];
  member : any;
  isRegister: boolean = true;
  translation:any={};
  constructor(public navCtrl: NavController, 
    private navParams : NavParams,
    private memberProvider:MemberProvider,
    private commonProvider:CommonProvider,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private superTabsCtrl:SuperTabsController) {
      this.isRegister = this.navParams.get('isRegister') === undefined ? true : this.navParams.get('isRegister');
  }

  ionViewWillEnter(){
    
      let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Child')[0];
      this.translation=translationSource.Translation;
    

    this.commonProvider.getMember().then((memberInfo)=>{
      if(memberInfo && memberInfo.MemberId && memberInfo.MemberId>0){
        let loading = this.loadingCtrl.create({content : MyApp.loadingMsg});
        loading.present();
        let model : ChildRequest = {
          MemberId : memberInfo.MemberId,
          Lang : MyApp.currentLanguage
        };
        this.memberProvider.childList(model).subscribe(result=>{
          this.isLoading=false;
          loading.dismiss();
          if(result.HasError){
            //this.alertCtrl.create({title : result.Error.Title, message : result.Error.Message,buttons:["OK"]}).present();
          }else{
            this.childList = result.Result;
          }      
        });
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
    });    
    
  }

  editChild(childId){
    this.navCtrl.push('QuestionFormPage',{ categoryId : 4, childId:childId });
  }

  next(){
    this.superTabsCtrl.slideTo(6);
  }

}
