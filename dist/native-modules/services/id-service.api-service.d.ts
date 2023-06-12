import { HttpClient } from 'aurelia-http-client';
import { IHttpResponse } from 'models/public-models';
export declare class IdServiceApiService {
    private http;
    ssoToken: string;
    constructor(http: HttpClient);
    getReferencesByUri(uri: string): Promise<any>;
    getByUri<T>(uri: string, getSso: () => Promise<string>): Promise<IHttpResponse<T>>;
}
