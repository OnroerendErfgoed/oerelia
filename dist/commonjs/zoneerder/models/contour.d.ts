export declare class Contour {
    coordinates: [number, number][][][];
    crs: object;
    type: string;
    constructor(c?: Contour);
}
export interface Referentielaag {
    value: ReferentielaagEnum;
    label: string;
}
export interface DomeinStrategie {
    value: StrategieEnum;
    label: string;
}
export declare const enum ReferentielaagEnum {
    GRBPercelenlaag = "ADP",
    GRBGebouwenlaag = "GBG"
}
export declare const enum StrategieEnum {
    EenzijdigSnappen = "SNAP_SINGLE_SIDE",
    TweezijdigSnappen = "SNAP_ALL_SIDE",
    ExactOvernemen = "AS_IS",
    Uitsluiten = "EXCLUDE"
}
export interface IAlignerResponse {
    diffs: Diffs;
    series: {
        [key: string]: {
            [key: string]: ISeriesValue;
        };
    };
}
export type Diffs = {
    [key: string]: number;
};
export interface ISeriesValue {
    result: Contour;
    result_diff_min: Contour;
    result_diff_plus: Contour;
}
export type AlignGrb = (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
