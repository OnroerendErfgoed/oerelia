import { DialogController } from 'aurelia-dialog';
export declare class ReferencesDialog {
    private controller;
    references: any;
    loading: boolean;
    private apiService;
    constructor(controller: DialogController);
    activate(model: any): void;
}
