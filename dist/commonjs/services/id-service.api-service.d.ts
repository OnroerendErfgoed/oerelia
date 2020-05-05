import { HttpClient } from 'aurelia-http-client';
export declare class IdServiceApiService {
    private http;
    constructor(http: HttpClient);
    getReferencesByUri(uri: string): Promise<any>;
}
