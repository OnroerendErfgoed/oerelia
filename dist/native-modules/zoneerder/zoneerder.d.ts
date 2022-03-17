import { HttpClient } from 'aurelia-http-client';
import { OlMap } from './components/ol-map';
import { CrabService } from '../services/crab.api-service';
import { GeozoekdienstApiService } from '../services/geozoekdienst.api-service';
import { Contour } from './models/contour';
import { ButtonConfig } from './models/buttonConfig';
import { LayerConfig } from './models/layerConfig';
export declare class Zoneerder {
    private http;
    private crabService;
    private geozoekdienstApiService;
    locatie: any;
    disabled: boolean;
    zone: Contour;
    adrespunten?: Contour[];
    buttonConfig: ButtonConfig;
    layerConfig: LayerConfig;
    isCollapsed?: boolean;
    map: OlMap;
    protected suggest: {
        suggest: Function;
    };
    constructor(http: HttpClient, crabService: CrabService, geozoekdienstApiService: GeozoekdienstApiService);
    onMapLoaded($event: any): void;
    resize(): void;
    locatieChanged(): void;
    zoomToCrab(locatie: any): void;
}
