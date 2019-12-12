import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MyApp } from '../app/app.component';

@Injectable()
export class ApiProvider {
  //BASE_URL : string = "http://192.168.0.9:8013/api";
  BASE_URL : string = "http://herapi.wdtajans.com/api";
  constructor(public http: HttpClient) {}

  postPromise(url:string,data:any){
    url = this.BASE_URL + url;
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');    

    if(data){
      data.Lang=MyApp.currentLanguage;
    }else{
      data = { Lang : MyApp.currentLanguage };
    }
    
    console.log("Api Info => " + url);
    console.log("Api Post Data => " + JSON.stringify(data));
    return this.http.post(url, data, { headers : headers });
  }

}
