import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { CommonProvider } from '../../providers/common';
import { QuestionProvider } from '../../providers/question';
import { MyApp } from '../../app/app.component';
import { QuestionRequest, QuestionItem } from '../../entity/question/question';
import { SaveAnswerRequest, SaveQuestionItem, SaveAnswerItem } from '../../entity/question/saveAnswer';


@IonicPage()
@Component({
  selector: 'page-sp-yakin',
  templateUrl: 'sp-yakin.html',
})
export class SpYakinPage {
  isLoading : boolean = true;
  pageData : any;
  memberInfo : any;
  categoryId : number = 0;
  childId : number = 0;
  translation : any = {};
  constructor(public navCtrl: NavController,
    private navParams : NavParams,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController,
    private commonProvider:CommonProvider,
    private questionProvider:QuestionProvider,
    public superTabsCtrl:SuperTabsController) {
      this.categoryId = 2;
      this.childId = -1;
  }

  ionViewWillEnter() {
    let translationSource = MyApp.translationSource.filter(x=>x.Screen=='Home')[0];
    this.translation=translationSource.Translation;
    this.commonProvider.getMember().then((memberInfo)=>{
      if(memberInfo && memberInfo.MemberId && memberInfo.MemberId>0){
        this.memberInfo=memberInfo;
        let loading = this.loadingCtrl.create({content:MyApp.loadingMsg});
        loading.present();

        let model : QuestionRequest = {
          MemberId : memberInfo.MemberId,
          CategoryId : this.categoryId,
          Lang : MyApp.currentLanguage,
          ChildId : this.childId
        };
        this.questionProvider.questionList(model).subscribe(result=>{
          loading.dismiss();
          this.pageData = result.Result;
          this.pageData.QuestionList.forEach(element => {
            if(element.AnswerTypeId==4 && element.Answer && element.Answer.length>0){
              element.Answer = element.Answer.split(',');
            }
          });
          this.isLoading =false;
          console.log(result);      
        });
      }else{
        this.navCtrl.setRoot("LoginPage");
      }
    });  

    
  }

  isHidden(question:QuestionItem){

    var result : Boolean = question.IsConnected;
    
    if(result){
      var target : QuestionItem = this.pageData.QuestionList.filter(x=>x.QuestionId==question.ConnectedQuestionId)[0];
      if(target){
        result = !(target.Answer==question.ConnectedAnswerId.toString());
      }
    }

    return result;
  }

  checkIdentity(event){
    console.log(event);
    let identityNumber = event._value;
    if(identityNumber.length>1){
      let isValid = this.validateIdentityNumber(identityNumber);      
      if(!isValid){
        this.alertCtrl.create({title:this.translation.lblError,message:this.translation.lblIdentityNumber,buttons:[this.translation.lblOk]}).present();
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

  saveForm(){
    var model : SaveAnswerRequest = {
      MemberId : this.memberInfo.MemberId,
      CategoryId : this.pageData.CategoryId,
      ChildId : this.childId,
      QuestionList : [],
      Lang : MyApp.currentLanguage 
    };
    console.log(this.pageData);
    this.pageData.QuestionList.forEach(element => {
      var questionItem : SaveQuestionItem = {
        QuestionId : element.QuestionId,
        AnswerList : []
      }
      if(element.Answer instanceof Array){
        element.Answer.forEach(x => {          
          let item : SaveAnswerItem = {
            Answer : element.AnswerList.filter(c=> c.AnswerId==x)[0].Answer,
            AnswerId : x           
          };
          questionItem.AnswerList.push(item)
        });        
      }else{
        if(element.AnswerTypeId==4 && element.AnswerList[0].DataTypeId==3){
          element.AnswerList.forEach(x=>{
            let itemX : SaveAnswerItem = {
              Answer : x.Answer,
              AnswerId : x.AnswerId           
            };  
            questionItem.AnswerList.push(itemX);
          });
        }else{
          let itemY : SaveAnswerItem = {
            Answer : element.Answer,
            AnswerId : 0           
          };
          // if(itemY.Answer===null){
          //   itemY.Answer = " ";
          // }
          console.log(itemY,element);
          questionItem.AnswerList.push(itemY);
        }        
      }      
        model.QuestionList.push(questionItem);
    });
    console.log(model);
    
    let loading = this.loadingCtrl.create({content:MyApp.loadingMsg.toString()});
    loading.present();
    this.questionProvider.saveAnswer(model).subscribe((result)=>{
      loading.dismiss();
      if(this.categoryId==4){
        this.navCtrl.pop();
      }else{
        this.superTabsCtrl.slideTo(4);
      }

      // let alert = this.alertCtrl.create({title : 'Hera', message : result.Result,buttons:[this.translation.lblOk]});
      // alert.onDidDismiss(()=>{
        
      // });
      // alert.present();
    });
  }

  next(){
    
  }

}
