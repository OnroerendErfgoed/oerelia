import * as ol from 'openlayers';
import { IBoundingbox } from '../models/public-models';
export declare class MapConfig {
    mapProjection: ol.proj.Projection;
    useGeolocate: boolean;
    useLayerswitcher: boolean;
    center?: ol.Coordinate;
    maxZoom?: number;
    minZoom?: number;
    zoom?: number;
    geolocateZoom?: number;
    geolocateTracking: boolean;
    constructor(mapProjection: ol.proj.Projection, useGeolocate?: boolean, useLayerswitcher?: boolean, center?: ol.Coordinate, maxZoom?: number, minZoom?: number, zoom?: number, geolocateZoom?: number, geolocateTracking?: boolean);
}
export declare class MapUtil {
    static transformBoundingboxToMapExtent(boundingbox: IBoundingbox): ol.Extent;
    static transformLatLonToPoint(lat: number, lon: number): ol.geom.Point;
    static createGrbLayer(grbLayerId: string, type: string, title: string, isBaseLayer: boolean, visible: boolean, mapProjection: ol.proj.Projection): ol.layer.Layer;
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
