import { DialogController, DialogService } from 'aurelia-dialog';
import { IAuteurRelatie } from 'models/public-models';
export declare class AuteurWidget {
    dialogService: DialogService;
    controller: DialogController;
    auteurType: string;
    service: unknown;
    auteursUrl: string;
    isEigenaarVermogensrecht: boolean;
    isBeheerder: boolean;
    auteurRelaties?: IAuteurRelatie[];
    single: boolean;
    zoekterm: string;
    collegas: boolean;
    mailLink: string;
    private gridOptions;
    private buttonActief;
    private validAuteurRelaties;
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
    private filterValidRelaties;
}
