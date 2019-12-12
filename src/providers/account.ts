import { Injectable } from "@angular/core";
import { ApiProvider } from "./api";
import { Observable } from "rxjs/Observable";
import { Response } from "../entity/response";
import { TranslationItem } from "../entity/translation/translationItem";
import { MyApp } from "../app/app.component";
import { CheckInfoRequest } from "../entity/account/checkInfo";
import { RegisterRequest, RegisterResponse } from "../entity/account/register";
import { LoginRequest, LoginResponse } from "../entity/account/login";

@Injectable()
export class AccountProvider {

    constructor(private apiProvider : ApiProvider){}

    checkInfo(model:CheckInfoRequest):Observable<Response<boolean>>{
        return <Observable<Response<boolean>>>this.apiProvider.postPromise('/Common/CheckInfo',model);
    }

    register(model:RegisterRequest):Observable<Response<RegisterResponse>>{
        return <Observable<Response<RegisterResponse>>>this.apiProvider.postPromise('/Account/Register',model);
    }

    login(model:LoginRequest):Observable<Response<LoginResponse>>{
        return <Observable<Response<LoginResponse>>>this.apiProvider.postPromise('/Account/Login',model);
    }
    
    translation():Observable<Response<TranslationItem[]>>{
        return <Observable<Response<TranslationItem[]>>>this.apiProvider.postPromise("/Translation/List?Lang="+MyApp.currentLanguage,null);
    }

}