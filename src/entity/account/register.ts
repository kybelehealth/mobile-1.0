import { BaseRequest } from '../baseRequest';
export class RegisterRequest extends BaseRequest {
    Mobile : String = "";
    Password : String = "";
    Photo : String = "";
    Lastname : String = "";
    Firstname : String = "";
    Birthdate : String = "";
    Gender : String = "";
    Job : String = "";
    Email : String = "";
    Address : String = "";
    Platform : String = "";    
}

export class RegisterResponse{
    MemberId : Number = 0;
    Firstname : String = "";
    Lastname : String = "";
}