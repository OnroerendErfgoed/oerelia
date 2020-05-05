import { HttpClient } from 'aurelia-http-client';
export declare class IdServiceApiService {
    private http;
    ssoToken: string;
    constructor(http: HttpClient);
    getReferencesByUri(uri: string): Promise<any>;
}
