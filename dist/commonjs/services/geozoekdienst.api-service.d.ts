import { HttpClient } from 'aurelia-http-client';
export declare class GeozoekdienstApiService {
    private http;
    constructor(http: HttpClient);
    getGeozoekDienstObjecten(geometrie: any): Promise<any>;
    searchPerceel(coordinate: any, srsname: any): Promise<any>;
    searchGebouw(coordinate: any, srsname: any): Promise<any>;
}
