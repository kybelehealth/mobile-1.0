import { Injectable } from "@angular/core";
import { ApiProvider } from "./api";
import { Observable } from "rxjs/Observable";
import { Response } from "../entity/response";
import { QuestionResponse,QuestionRequest } from "../entity/question/question";
import { SaveAnswerRequest } from "../entity/question/saveAnswer";

@Injectable()
export class QuestionProvider {

    constructor(private apiProvider : ApiProvider){}

    questionList(model : QuestionRequest):Observable<Response<QuestionResponse>>{
        return <Observable<Response<QuestionResponse>>>this.apiProvider.postPromise("/Question/QuestionList",model);
    }

    saveAnswer(model: SaveAnswerRequest):Observable<Response<string>>{
        return <Observable<Response<string>>>this.apiProvider.postPromise("/Question/SaveAnswer",model);
    }

}