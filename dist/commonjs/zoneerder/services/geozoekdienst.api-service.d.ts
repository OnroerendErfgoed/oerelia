import { HttpClient } from 'aurelia-http-client';
export declare class GeozoekdienstApiService {
    private http;
    private crabpyUrl;
    private agivGrbUrl;
    constructor(http: HttpClient, crabpyUrl: string, agivGrbUrl: string);
    getGeozoekDienstObjecten(geometrie: any): Promise<any>;
    searchPerceel(coordinate: any, srsname: any): Promise<any>;
}
