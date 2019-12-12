import { Injectable } from "@angular/core";
import { ApiProvider } from "./api";
import { Observable } from "rxjs/Observable";
import { Response } from "../entity/response";
import { BlogItem, BlogListRequest } from "../entity/blog/blog";
import { MyApp } from "../app/app.component";

@Injectable()
export class BlogProvider {

    constructor(private apiProvider : ApiProvider){}


    blogList():Observable<Response<BlogItem[]>>{
        let model : BlogListRequest = {
            Lang : MyApp.currentLanguage
        };
        return <Observable<Response<BlogItem[]>>>this.apiProvider.postPromise("/Blog/BlogList",model);
    }

}