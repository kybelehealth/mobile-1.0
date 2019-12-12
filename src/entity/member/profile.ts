import { BaseRequest } from '../baseRequest';
export class ProfileInfoRequest extends BaseRequest{
    MemberId : Number = 0;
}

export class ProfileInfoResponse{
    MemberId : Number = 0;
    Firstname : string = "";
    Lastname : string = "";
    ProfilePhoto: string = "";
    Birthdate : string = "";
    Gender : string = "";
    Email : string = "";
    Mobile : string = "";
    Job : string = "";
    Address : string = "";
}