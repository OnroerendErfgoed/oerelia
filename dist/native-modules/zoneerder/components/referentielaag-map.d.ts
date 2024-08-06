import * as ol from 'openlayers';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { BaseMap } from './base-map';
export declare class ReferentieLaagMap extends BaseMap {
    zone: Contour;
    alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    private resultLayer;
    private diffPlusLayer;
    private diffMinLayer;
    constructor();
    attached(): void;
    createResultLayer(geometry: Contour): ol.layer.Layer;
    createDiffPlusLayer(geometry: Contour): ol.layer.Layer;
    createDiffMinLayer(geometry: Contour): ol.layer.Layer;
    resultsUpdated(results: {
        [key: string]: Contour;
    }): void;
}
