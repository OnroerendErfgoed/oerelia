import { GridOptions } from 'ag-grid';
import { DialogController } from 'aurelia-dialog';
import { NewInstance, Container } from 'aurelia-dependency-injection';
export declare class ActorWidget {
    private controller;
    static inject: (typeof Container | NewInstance<DialogController, DialogController, [import("aurelia-dialog").Renderer, import("aurelia-dialog").DialogSettings, (data?: any) => void, (reason: any) => void]>)[];
    showSpinner: boolean;
    gridOptions: GridOptions;
    zoekterm: string;
    selectedActor: any;
    showTable: boolean;
    showActor: boolean;
    showFilters: boolean;
    isAdvancedSearch: boolean;
    landen: any[];
    gemeenten: any[];
    postcodes: any[];
    straten: any[];
    huisnrs: any[];
    suggest: any;
    private scope;
    private filters;
    constructor(controller: any);
    activate(model: any): void;
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
    save(): void;
    private loadLanden;
    private loadGemeenten;
    private loadPostcodes;
    private loadStraten;
    private loadHuisnrs;
}
