import { HttpClient } from 'aurelia-http-client';
export declare class IdServiceApiService {
    private http;
    private ssoToken;
    constructor(http: HttpClient, ssoToken: string);
    getReferencesByUri(uri: string): Promise<any>;
}
