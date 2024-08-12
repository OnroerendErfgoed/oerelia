import { DialogController } from 'aurelia-dialog';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { type Geometry } from 'geojson';
export declare class ZoneVergelijkingDialog {
    controller: DialogController;
    zone: Contour;
    buttonConfig: ButtonConfig;
    layerConfig: import("exports").LayerConfig;
    alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    resultaat: Geometry;
    constructor(controller: DialogController);
    activate(model: {
        zone: Contour;
        alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    }): void;
    neemResultaatOverVanZone(): void;
}
