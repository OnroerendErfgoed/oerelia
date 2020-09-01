import { HttpClient } from 'aurelia-http-client';
import { CrabService } from '../services/crab.api-service';
import { GeozoekdienstApiService } from '../services/geozoekdienst.api-service';
import { Contour } from './models/contour';
import { ButtonConfig } from './models/buttonConfig';
export declare class Zoneerder {
    private http;
    private crabService;
    private geozoekdienstApiService;
    locatie: any;
    disabled: boolean;
    zone: Contour;
    adrespunten?: Contour[];
    buttonConfig: ButtonConfig;
    protected suggest: {
        suggest: Function;
    };
    private map;
    constructor(http: HttpClient, crabService: CrabService, geozoekdienstApiService: GeozoekdienstApiService);
    onMapLoaded($event: any): void;
    resize(): void;
    locatieChanged(): void;
    zoomToCrab(locatie: any): void;
}
