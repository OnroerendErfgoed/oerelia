import { Contour } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
export declare class ZoneVergelijkingDialog {
    zone: Contour;
    buttonConfig: ButtonConfig;
    layerConfig: import("exports").LayerConfig;
    activate(model: {
        zone: Contour;
    }): void;
}
