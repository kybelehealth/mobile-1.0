import { BaseRequest } from '../baseRequest';
export class HealthCenterRequest extends BaseRequest{
    Latitude : Number = 0;
    Longitude : Number = 0;
}

export class HealthCenter{
    Name : string = "";
    Address : string = "";
    Phone: string = "";
    Latitude : string = "";
    Longitude : string = "";
    Distance : string = "";
    DistanceVal : number = 0;
}