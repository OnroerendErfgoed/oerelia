import { GridOptions } from 'ag-grid-community';
import { DialogController } from 'aurelia-dialog';
import { IGemeente, ILand, IPostcode, IStraat } from '../models/public-models';
import { IAdresCrabConfig } from '../adres-crab/types/adres-crab-config';
import { AdresregisterService } from '../services/adresregister.api-service';
export declare class ActorWidget {
    private adresregisterService;
    scope: any;
    actorenApiService: any;
    dialogController: DialogController;
    showSpinner: boolean;
    gridOptions: GridOptions;
    zoekterm: string;
    selectedActor: any;
    showTable: boolean;
    showActor: boolean;
    showFilters: boolean;
    isAdvancedSearch: boolean;
    landen: ILand[];
    gemeenten: IGemeente[];
    postcodes: IPostcode[];
    straten: IStraat[];
    suggest: any;
    adresCrabConfig: IAdresCrabConfig;
    private filters;
    private vrijAdres;
    private vlaamseProvinciesNiscodes;
    constructor(adresregisterService: AdresregisterService);
    bind(): void;
    setRowData(): void;
    keydown(e: any): boolean;
    onGridReady(): void;
    onGridSizeChanged(): void;
    search(): void;
    refresh(): void;
    advancedSearch(): void;
    clearFilters(): void;
    toggleFilters(activate: boolean): void;
    selectActor(params: any): void;
    toggleActorDetail(activate: boolean, params: any): void;
    toevoegen(): void;
    annuleren(): void;
    private actiesCellRenderer;
    private loadLanden;
    private loadGemeenten;
    private loadPostcodes;
    private loadStraten;
    private loadHuisnrs;
    private loadBusnrs;
    private suggestFilter;
    private filterPostcodes;
    private isVlaamseProvincie;
    private filterHuisnummers;
    private filterBusnummers;
}
