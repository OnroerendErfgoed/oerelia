import { DialogService } from "aurelia-dialog";
import { Contour, IAlignerResponse } from '../models/contour';
import { ReferentielaagEnum, StrategieEnum } from '../models/contour';
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
    private volledigGealligneerd;
    private histogramData;
    constructor(dialogService: DialogService);
    openOpenbaarDomeinLegende(): void;
    onHistogramDataChanged(): Promise<void>;
    relevanteAfstandChanged(nv: string, ov: string): void;
}
