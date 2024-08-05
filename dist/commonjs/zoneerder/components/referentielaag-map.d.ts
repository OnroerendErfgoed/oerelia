import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { BaseMap } from './base-map';
export declare class ReferentieLaagMap extends BaseMap {
    zone: Contour;
    alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    constructor();
    attached(): void;
}
