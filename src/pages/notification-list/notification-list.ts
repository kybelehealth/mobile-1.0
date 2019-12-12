import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NotificationItem, NotificationSaveRequest } from '../../entity/member/notification';
import { MyApp } from '../../app/app.component';
import { MemberProvider } from '../../providers/member';

@IonicPage()
@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
})
export class NotificationListPage {
  isLoading:boolean=true;
  dataList : NotificationItem[];
  memberId : Number = 0;
  constructor(public navCtrl: NavController,
    private navParams : NavParams,
    private loadingCtrl:LoadingController,
    private alertCtrl : AlertController,
    private memberProvider:MemberProvider) {
      this.dataList = <NotificationItem[]>navParams.get('data');
      this.memberId = navParams.get('memberId');
      this.isLoading=false;
  }

  ionViewWillEnter(){
    
  }
 

  openDetail(blogItem : NotificationItem) {
    let alert = this.alertCtrl.create({ title : blogItem.Date, message:blogItem.Message,buttons:["OK"] });
    alert.onDidDismiss(()=>{
      let model : NotificationSaveRequest = {
        MemberId : this.memberId,
        MessageId : blogItem.Id,
        Type : "Read",
        Lang : MyApp.currentLanguage
      };
      this.memberProvider.notificationSave(model).subscribe((result)=>{
        this.navCtrl.pop();
      });
    });
    alert.present();
  }

}
