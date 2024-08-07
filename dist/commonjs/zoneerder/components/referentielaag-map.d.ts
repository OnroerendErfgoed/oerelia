import * as ol from 'openlayers';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { BaseMap } from './base-map';
import { type Geometry } from 'geojson';
export declare class ReferentieLaagMap extends BaseMap {
    zone: Contour;
    alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    private resultLayer;
    private diffPlusLayer;
    private diffMinLayer;
    constructor();
    attached(): void;
    createResultLayer(geometry: Geometry): ol.layer.Layer;
    createDiffPlusLayer(geometry: Geometry): ol.layer.Layer;
    createDiffMinLayer(geometry: Geometry): ol.layer.Layer;
    resultsUpdated(results: {
        [key: string]: Geometry;
    }): void;
}
