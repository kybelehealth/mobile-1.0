import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';
import { MemberProvider } from '../../providers/member';
import { MyApp } from '../../app/app.component';
import { HealthRecordRequest, HealthRecordItem } from '../../entity/member/healthRecord';

@IonicPage()
@Component({
  selector: 'page-saglik-kayitlarim',
  templateUrl: 'saglik-kayitlarim.html',
})
export class SaglikKayitlarimPage {
  isLoading : boolean = true;
  memberInfo : any;
  dataList : HealthRecordItem[];
  translation : any = {};
  constructor(public navCtrl: NavController,
    private loadingCtrl : LoadingController,
    private commonProvider:CommonProvider,
    private memberProvider:MemberProvider) {

  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='My Health Records')[0];
    this.translation=translationSource.Translation;
    this.commonProvider.getMember().then((result)=>{
      if(result && result.MemberId && result.MemberId>0){
        this.memberInfo = result;
        let loading = this.loadingCtrl.create({content:MyApp.loadingMsg});
        loading.present();
        let model : HealthRecordRequest = { MemberId : result.MemberId, Lang : MyApp.currentLanguage   };
        this.memberProvider.healthRecordList(model).subscribe((result)=>{
          loading.dismiss();
          this.isLoading=false;
          this.dataList=result.Result;
        });
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
    });
  }

  call(){
    this.navCtrl.push("SpRaporPage",{memberId : this.memberInfo.MemberId}); 
  }

}
