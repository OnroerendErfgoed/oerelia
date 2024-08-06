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
    EenzijdingSnappen = "SNAP_SINGLE_SIDE",
    TweezijdigSnappen = "SNAP_ALL_SIDE",
    ExactOvernemen = "AS_IS",
    Uitsluiten = "EXCLUDE"
}
export interface IAlignerResponse {
    diffs: Diffs;
    series: {
        [key: string]: {
            [key: string]: object;
        };
    };
}
export type Diffs = {
    [key: string]: number;
};
