import { DialogController, DialogService } from 'aurelia-dialog';
export declare class AuteurWidget {
    dialogService: DialogService;
    controller: DialogController;
    auteurType: string;
    service: unknown;
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
