import { BaseRequest } from '../baseRequest';
export class BlogListRequest extends BaseRequest{}

export class BlogItem{
    Title : string = "";
    Date : string = "";
    Picture : string = "";
    Abstract : string = "";
    Content : string = "";
}