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
    private relevanteAfstand;
    private max;
    private min;
    private floatMin;
    private floatMax;
    private increment;
    constructor(dialogService: DialogService);
    bind(): void;
    openOpenbaarDomeinLegende(): void;
    relevanteAfstandChanged(nv: string, ov: string): void;
}
