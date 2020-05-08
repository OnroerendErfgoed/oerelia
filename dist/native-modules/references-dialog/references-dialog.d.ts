import { DialogController } from 'aurelia-dialog';
import { IdServiceApiService } from '../services/id-service.api-service';
export declare class ReferencesDialog {
    private controller;
    private apiService;
    references: any;
    loading: boolean;
    constructor(controller: DialogController, apiService: IdServiceApiService);
    activate(model: any): void;
}
