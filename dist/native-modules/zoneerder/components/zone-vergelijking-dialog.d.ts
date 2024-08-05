import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
export declare class ZoneVergelijkingDialog {
    zone: Contour;
    buttonConfig: ButtonConfig;
    layerConfig: import("exports").LayerConfig;
    alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    activate(model: {
        zone: Contour;
        alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    }): void;
}
