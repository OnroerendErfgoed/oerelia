import { DialogController } from 'aurelia-dialog';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum, AlignGrb } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { type Geometry } from 'geojson';
export declare class ZoneVergelijkingDialog {
    controller: DialogController;
    zone: Contour;
    buttonConfig: ButtonConfig;
    layerConfig: import("../..").LayerConfig;
    alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    laatstGealigneerd: string;
    resultaat: Geometry;
    constructor(controller: DialogController);
    activate(model: {
        zone: Contour;
        alignGrb: AlignGrb;
        laatstGealigneerd: string;
    }): void;
    neemResultaatOverVanZone(): void;
}
