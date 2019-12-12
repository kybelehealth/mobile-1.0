import { BaseRequest } from '../baseRequest';
export class NotificationListRequest extends BaseRequest{
    MemberId : Number = 0;
}

export class NotificationItem{
    Id : number = 0;
    Message : string = "";
    Date : string = "";
    IsRead : boolean = false;
}

export class NotificationSaveRequest extends BaseRequest{
    MemberId : Number = 0;
    MessageId : Number = 0;
    Type : string = "";
}