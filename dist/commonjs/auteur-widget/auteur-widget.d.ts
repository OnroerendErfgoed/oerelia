import { DialogController, DialogService } from 'aurelia-dialog';
import { IAuteur, IRangeHeader, IResponse, ParamsType } from 'models/public-models';
export declare class AuteurWidget {
    dialogService: DialogService;
    controller: DialogController;
    auteurType: string;
    getAll: (params: ParamsType, range?: IRangeHeader) => Promise<IResponse<IAuteur>>;
    auteursUrl: string;
    zoekterm: string;
    title: string;
    private gridOptions;
    private buttonActief;
    constructor(dialogService: DialogService, controller: DialogController);
    bind(): void;
    setRowData(): Promise<void>;
    onGridReady(): void;
    resize(): void;
    refresh(): void;
    search(): void;
    addAuteur(): void;
    private getColumnDefinitions;
    private actiesCellRenderer;
    private huidigeRelatiesCellRenderer;
    private setParameters;
}
