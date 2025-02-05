import { DialogController, DialogService } from 'aurelia-dialog';
import { IErkenning, IErkenningNew } from 'models/public-models';
export declare class AuteurWidget {
    dialogService: DialogService;
    controller: DialogController;
    auteurType: string;
    service: unknown;
    auteursUrl: string;
    isEigenaarVermogensrecht: boolean;
    userErkenningen?: IErkenning[] | IErkenningNew[];
    zoekterm: string;
    erkendeCollegas: boolean;
    mailLink: string;
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
    isAnyRowSelected(): boolean;
}
