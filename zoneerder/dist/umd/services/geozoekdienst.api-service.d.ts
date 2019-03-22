import { HttpClient } from 'aurelia-http-client';
export declare class GeozoekdienstApiService {
    private http;
    private crabpyUrl;
    private agivGrbUrl;
    constructor(http: HttpClient);
    /**
     * Get Geo zoek diensten objecten
     * @param geometrie
     * @returns {Promise<any>}
     */
    getGeozoekDienstObjecten(geometrie: any): Promise<any>;
    searchBeschermingen(coordinate: any, srsname: any): Promise<any>;
    searchPerceel(coordinate: any, srsname: any): Promise<any>;
    private createBbox(coordinate);
}
