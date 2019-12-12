import { BaseRequest } from '../baseRequest';
export class QuestionRequest extends BaseRequest{
    MemberId : Number = 0;
    CategoryId : Number = 0;
    ChildId : Number = 0;
}

export class QuestionResponse{
    Title : string = "";
    Description : string = "";
    CategoryId : Number = 0;
    QuestionList : QuestionItem[]=[];
}

export class QuestionItem{
    QuestionId : Number = 0;
    Question : string = "";
    AnswerTypeId : Number = 0;
    AnswerDataTypeId : Number = 0;
    IsConnected : Boolean = false;
    ConnectedQuestionId : Number = 0;
    ConnectedAnswerId : Number = 0;
    AnswerList : AnswerItem[] = [];
    Answer : String="";
}

export class AnswerItem{
    AnswerId : Number = 0;
    DataTypeId : Number = 0;
    Answer : string = "";
    IsDefault : Boolean = false;
}