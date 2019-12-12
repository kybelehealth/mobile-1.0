import { Error } from './error';
export class Response<T>
{
    HasError : Boolean = false;
    Error : Error;
    Result : T;
}