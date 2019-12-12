import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, LoadingController } from 'ionic-angular'; 
import { MyApp } from '../../app/app.component';
import { OneSignal } from '@ionic-native/onesignal';
import { CommonProvider } from '../../providers/common';
import { MemberProvider } from '../../providers/member';
import { NotificationItem, NotificationListRequest } from '../../entity/member/notification';
import { Platform } from 'ionic-angular/platform/platform';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  translation : any = {
    lblNearBy:'',
    lblVaccinateCalendar:'',
    lblHealthProfile:'',
    lblHealthRecord:'',
    lblHealthInfo:'',
    lblEmergency:''
  };
  memberId : Number = 0;
  notificationList: NotificationItem[];
  unReadMessage : number = 0;
  currentLanguage:string = "";
  constructor(public navCtrl: NavController,
    public actionSheetController: ActionSheetController,
    private commonProvider:CommonProvider,
    private memberProvider:MemberProvider,
    private oneSignal: OneSignal,
    private platform:Platform,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController) {    
      this.currentLanguage = MyApp.currentLanguage.toString();
  }

  ionViewWillEnter(){
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Home')[0];
    this.translation=translationSource.Translation;
    this.commonProvider.getMember().then((result)=>{
      if(result && result.MemberId && result.MemberId>0){
        this.platform.ready().then(()=>{
          this.setOneSignal(result.MemberId);
        });
        this.bindNotificationList(result.MemberId);
        this.memberId = result.MemberId;
      }
    });
  }

  presentNotificationList(){
    this.navCtrl.push("NotificationListPage",{data : this.notificationList, memberId : this.memberId});
  }

  setOneSignal(memberId){
    this.oneSignal.startInit('ccd26a74-e418-44ec-8c8d-9fe8e8677006', '777932748313');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((jsonData) => {
      var type="";
        var notificationId=0;
        var title="";
        var message="";
        if(jsonData.payload.additionalData){
          notificationId=parseInt(jsonData.payload.additionalData.notificationId);
          type= jsonData.payload.additionalData.type;
          title=jsonData.payload.additionalData.title;
          message=jsonData.payload.body;
        }
        var buttons=[];
        if(notificationId>0){
          buttons =[
            {
              text: this.translation.lblClose,
              role:'cancel',
              handler:()=>{ 
                console.log();
              }
            }
          ];
        }
        if(title.length>0)
        this.showAlert(title,message,buttons);
    });
    this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
      var type="";
        var notificationId=0;
        var title="";
        var message="";
        if(jsonData.notification.payload.additionalData){
          notificationId=parseInt(jsonData.notification.payload.additionalData.notificationId);
          type= jsonData.notification.payload.additionalData.type;
          title=jsonData.notification.payload.additionalData.title;
          message=jsonData.notification.payload.body;
        }
        var buttons=[];
        if(notificationId>0){
          buttons =[
            {
              text: this.translation.lblClose,
              role:'cancel',
              handler:()=>{ 
                console.log();
              }
            }
          ];
        }
        if(title.length>0)
        this.showAlert(title,message,buttons);
    });

    this.oneSignal.getIds().then(result=>{
      this.memberProvider.setNotification(memberId,result.userId,result.pushToken).subscribe((result)=>{
        console.log('====================================');
        console.log("SetNotification Result");
        console.log(JSON.stringify(result));
        console.log('====================================');
      });
    });
    this.oneSignal.endInit();
  }

  bindNotificationList(memberId){
    var model : NotificationListRequest = {
      MemberId : memberId,
      Lang : MyApp.currentLanguage
    };
    this.memberProvider.notificationList(model).subscribe((result)=>{
      if(result.HasError){

      }else{
        this.notificationList=result.Result;
        this.unReadMessage = this.notificationList.filter(x=>x.IsRead==false).length;
      }
    });
  }

  showAlert(title,message,buttons){
    let alert =this.alertCtrl.create({
      title:title,
      message:message,
      buttons:buttons
    });
    alert.present();
  }

  async presentActionSheet() {
    
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Türkçe',
        role: 'destructive', 
        handler: () => {
          this.changeLanguage('tr');
        }
      }, {
        text: 'العربية', 
        handler: () => {
          //this.alertCtrl.create({title:'Bilgi',message:'Arapça içerikler hazırlanıyor..',buttons:["OK"]}).present();
          this.changeLanguage('ar');
        }
      },
      {
        text: 'English',
        role: 'destructive', 
        handler: () => {
          this.changeLanguage('en');
        }
      }]
    });
    await actionSheet.present();
  }
  
  changeLanguage(langCode){
    this.currentLanguage = langCode;
    let loading = this.loadingCtrl.create({content:''});
    loading.present();
    this.commonProvider.setLanguage(langCode).then(()=>{
      MyApp.currentLanguage =langCode;
      this.setLoadingMessage();
      this.commonProvider.changeLanguage(langCode).then((result)=>{
        let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Home')[0];
        this.translation=translationSource.Translation;
        this.platform.setDir( MyApp.currentLanguage=="ar" ? "rtl" :"ltr" , true);
        loading.dismiss();
      });
    });  
  }

  setLoadingMessage(){
    switch (MyApp.currentLanguage) {
      case 'tr': MyApp.loadingMsg = "İşleminiz yapılırken, lütfen bekleyiniz.."; break;
      case 'ar': MyApp.loadingMsg = "يتم تنفيذ الأمر , لطفا انتظر"; break;
      default: MyApp.loadingMsg = "In progress, please wait."; break;
    }
  }

  openMember() {
    this.navCtrl.push("ProfilePage");
  }

  emergency() {
    this.navCtrl.push("EmergencyPage");
  }

  nearby() {
    this.navCtrl.push("NearbyPage");
  }

  healthProfile() {
    this.navCtrl.push("SaglikProfilimPage");
  }


  calendar() {
    this.navCtrl.push("AsiTakvimiPage");
  }

  

  kayitlar() {
    this.navCtrl.push("SaglikKayitlarimPage");
  }

  bilgiler() {
    this.navCtrl.push("SaglikBilgileriPage");
  }

 


}
