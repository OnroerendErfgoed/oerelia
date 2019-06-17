import { HttpClient } from 'aurelia-http-client';
import { Contour } from './models/contour';
export declare class Zoneerder {
    private http;
    locatie: any;
    disabled: boolean;
    zone: Contour;
    adrespunten: Contour[];
    protected suggest: {
        suggest: Function;
    };
    private map;
    private crabService;
    private geozoekdienstApiService;
    private serviceConfig;
    constructor(http: HttpClient);
    attached(): void;
    onMapLoaded($event: any): void;
    resize(): void;
    locatieChanged(): void;
    zoomToCrab(locatie: any): void;
}
