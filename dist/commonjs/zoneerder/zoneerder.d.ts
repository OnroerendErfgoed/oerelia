import { HttpClient } from 'aurelia-http-client';
import { CrabService } from '../services/crab.api-service';
import { Contour } from './models/contour';
export declare class Zoneerder {
    private http;
    private crabService;
    locatie: any;
    disabled: boolean;
    zone: Contour;
    adrespunten: Contour[];
    protected suggest: {
        suggest: Function;
    };
    private map;
    private geozoekdienstApiService;
    private serviceConfig;
    constructor(http: HttpClient, crabService: CrabService);
    attached(): void;
    onMapLoaded($event: any): void;
    resize(): void;
    locatieChanged(): void;
    zoomToCrab(locatie: any): void;
}
