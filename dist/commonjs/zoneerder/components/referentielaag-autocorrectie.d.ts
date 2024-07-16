import { DialogService } from 'aurelia-dialog';
export declare class ReferentielaagAutocorrectie {
    private dialogService;
    readonly referentieLagen: {
        value: string;
        label: string;
    }[];
    readonly strategieen: {
        value: string;
        label: string;
    }[];
    histogram: HTMLElement;
    private referentielaag;
    private domeinstrategie;
    constructor(dialogService: DialogService);
    bind(): void;
    openOpenbaarDomeinLegende(): void;
}
