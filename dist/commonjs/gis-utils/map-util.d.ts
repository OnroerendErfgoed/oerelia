import * as ol from 'openlayers';
import { Boundingbox } from './models/boundingbox';
import { MapConfig } from './models/map-config';
export declare class MapUtil {
    static transformBoundingboxToMapExtent(boundingbox: Boundingbox): [number, number, number, number];
    static transformLatLonToPoint(lat: number, lon: number): ol.geom.Point;
    static createGrbLayer(grbLayerId: string, title: string, isBaseLayer: boolean, visible: boolean, mapProjection: ol.proj.Projection): ol.layer.Layer;
    static createVectorLayer(options: any): ol.layer.Vector;
    static createNgiLayer(layerId: string, title: string, isBaseLayer: boolean): ol.layer.Layer;
    static createGrbWMSLayer(wmsLayers: string, title: string, isBaseLayer: boolean, mapProjection: ol.proj.Projection): ol.layer.Tile;
    static createMap(target: Element, config: MapConfig): ol.Map;
    static mergePolygons(features: ol.Feature[]): ol.Feature;
    static intersectPolygons(polygon1: ol.Feature, polygon2: ol.Feature): ol.Feature;
    static subtractPolygons(polygon1: ol.Feature, polygon2: ol.Feature): ol.Feature;
    static getContourFromFeature(feature: ol.Feature): any;
    static bufferZone(zone: ol.Feature, buffer: number): ol.Feature;
}
