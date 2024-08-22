import { DialogService } from "aurelia-dialog";
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
export declare class ReferentielaagAutocorrectie {
    private dialogService;
    resultsUpdated: (event: any) => any;
    zone: Contour;
    alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    readonly referentieLagen: {
        value: ReferentielaagEnum;
        label: string;
    }[];
    readonly strategieen: {
        value: StrategieEnum;
        label: string;
    }[];
    histogram: HTMLElement;
    laatstGealigneerd: string;
    private referentielaag;
    private domeinstrategie;
    private relevanteAfstand;
    private max;
    private min;
    private floatMin;
    private floatMax;
    private increment;
    private showHistogram;
    private loadingData;
    private volledigGealigneerd;
    private histogramData;
    constructor(dialogService: DialogService);
    bind(): Promise<void>;
    openOpenbaarDomeinLegende(): void;
    onHistogramDataChanged(): Promise<void>;
    relevanteAfstandChanged(nv: string, ov: string): void;
}
