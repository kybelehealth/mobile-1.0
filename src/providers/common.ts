import { Injectable } from "@angular/core";
import { ApiProvider } from "./api";
import { Observable } from "rxjs/Observable";
import { Response } from "../entity/response";
import { TranslationItem } from "../entity/translation/translationItem";
import { MyApp } from "../app/app.component";
import { Storage } from "@ionic/storage";
import { LoginResponse } from "../entity/account/login";
import { HealthCenter, HealthCenterRequest } from "../entity/healthCenter/healthCenter";

@Injectable()
export class CommonProvider {

    constructor(private apiProvider : ApiProvider, private storage: Storage){}
    changeLanguage(langCode){
        return new Promise((resolve,reject)=>{
            MyApp.currentLanguage = langCode;
            this.translation().subscribe((result)=>{
                MyApp.translationSource = result.Result;
                resolve(0);
            });        
        });
        
    }
    getMember(){
        return this.storage.get('memberInfo');
    }
    setMember(memberInfo : LoginResponse){
        return this.storage.set('memberInfo',memberInfo);
    }
    setLanguage(langCode){
        return this.storage.set('langCode',langCode);
    }
    getLanguage(){
        return this.storage.get('langCode');
    }
    clearMember(){
        return this.storage.remove('memberInfo');
    }
    translation():Observable<Response<TranslationItem[]>>{
        return <Observable<Response<TranslationItem[]>>>this.apiProvider.postPromise("/Translation/List?Lang="+MyApp.currentLanguage,null);
    }
    healthCenterList(model:HealthCenterRequest):Observable<Response<HealthCenter[]>>{
        return <Observable<Response<HealthCenter[]>>>this.apiProvider.postPromise("/Common/HealthCenterList",model);
    }

}