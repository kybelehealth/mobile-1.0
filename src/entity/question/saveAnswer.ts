import { BaseRequest } from '../baseRequest';
export class SaveAnswerRequest extends BaseRequest{
    MemberId : Number = 0;
    CategoryId : Number = 0;
    ChildId : Number = 0;
    QuestionList : SaveQuestionItem[]=[];
}

export class SaveQuestionItem{
    QuestionId : Number = 0;
    AnswerList : SaveAnswerItem[]=[];
}

export class SaveAnswerItem{
    AnswerId : Number = 0;
    Answer : string = "";
}