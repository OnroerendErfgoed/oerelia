import * as ol from 'openlayers';
import { Contour } from '../models/contour';
import { BaseMap } from './base-map';
export declare class ReferentieLaagMap extends BaseMap {
    zone: Contour;
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
    private createPatternBlob;
}
