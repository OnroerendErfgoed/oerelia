import { CrabService } from './services/crab.api-service';
export declare class Zoneerder {
    private crabService;
    locatie: any;
    disabled: boolean;
    protected suggest: any;
    private map;
    constructor(crabService: CrabService);
    onMapLoaded($event: any): void;
    resize(): void;
    locatieChanged(): void;
    zoomToCrab(locatie: any): void;
}
