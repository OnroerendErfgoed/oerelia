import { DialogController, DialogService } from 'aurelia-dialog';
import { IAuteur, IRangeHeader, IResponse, ParamsType } from 'models/public-models';
export declare class AuteurWidget {
    dialogService: DialogService;
    controller: DialogController;
    zoekterm: string;
    title: string;
    private gridOptions;
    private auteurType;
    private buttonActief;
    getAll: (params: ParamsType, range?: IRangeHeader) => Promise<IResponse<IAuteur>>;
    auteursUrl: string;
    constructor(dialogService: DialogService, controller: DialogController);
    activate(model: {
        auteurType: string;
        getAll: (params: ParamsType, range?: IRangeHeader) => Promise<IResponse<IAuteur>>;
        auteursUrl: string;
    }): void;
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
