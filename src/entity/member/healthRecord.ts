import { BaseRequest } from '../baseRequest';
export class HealthRecordRequest extends BaseRequest{
    MemberId : Number = 0;
}

export class HealthRecordItem{
    Id : Number = 0;
    MemberId : Number = 0;
    Name : string = "";
    Photo : string = "";
    Date: string = "";
}