import { Injectable } from "@angular/core";
import { ApiProvider } from "./api";
import { Observable } from "rxjs/Observable";
import { Response } from "../entity/response";
import { ProfileInfoRequest, ProfileInfoResponse } from "../entity/member/profile";
import { ChildRequest, ChildItem } from "../entity/member/child";
import { HealthRecordRequest, HealthRecordItem } from "../entity/member/healthRecord";
import { Platform } from "ionic-angular/platform/platform";
import { NotificationItem, NotificationListRequest, NotificationSaveRequest } from "../entity/member/notification";
import { MyApp } from "../app/app.component";

@Injectable()
export class MemberProvider {

    constructor(private apiProvider : ApiProvider,private platform:Platform){}

    profileInfo(model:ProfileInfoRequest):Observable<Response<ProfileInfoResponse>>{
        return <Observable<Response<ProfileInfoResponse>>>this.apiProvider.postPromise('/Member/ProfileInfo',model);
    }

    updateProfileInfo(model:ProfileInfoResponse):Observable<Response<boolean>>{
        return <Observable<Response<boolean>>>this.apiProvider.postPromise('/Member/ProfileInfoUpdate',model);
    }

    setNotification(memberId,notificationUserId,deviceToken){
        var model = {
          Platform : this.platform.is('android') ? 'Android':'iOS',
          MemberId: memberId,
          NotificationUserId: notificationUserId,
          DeviceToken: deviceToken,
          Lang : MyApp.currentLanguage
        };
        return this.apiProvider.postPromise('/Member/SaveDevice', model);
      }

    childList(model:ChildRequest):Observable<Response<ChildItem[]>>{
        return <Observable<Response<ChildItem[]>>>this.apiProvider.postPromise("/Member/ChildList",model);
    }

    healthRecordList(model:HealthRecordRequest):Observable<Response<HealthRecordItem[]>>{
        return <Observable<Response<HealthRecordItem[]>>>this.apiProvider.postPromise("/Member/HealthRecordList",model);
    }

    saveHealthRecord(model:HealthRecordItem):Observable<Response<string>>{
        return <Observable<Response<string>>>this.apiProvider.postPromise("/Member/SaveRecord",model);
    }

    notificationList(model:NotificationListRequest):Observable<Response<NotificationItem[]>>{
        return <Observable<Response<NotificationItem[]>>>this.apiProvider.postPromise("/Member/NotificationList",model);
    }

    notificationSave(model:NotificationSaveRequest):Observable<Response<string>>{
        return <Observable<Response<string>>>this.apiProvider.postPromise("/Member/NotificationSave",model);
    }

}