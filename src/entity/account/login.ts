import { BaseRequest } from '../baseRequest';
export class LoginRequest extends BaseRequest{
    Mobile : string = "";
    Password : string = "";
}

export class LoginResponse{
    MemberId : Number = 0;
    Firstname : string = "";
    Lastname : string = "";
}