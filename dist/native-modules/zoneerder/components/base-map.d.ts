import ol from 'openlayers';
import { ButtonConfig } from '../models/buttonConfig';
import { Contour } from '../models/contour';
import { IZoneerderServiceConfig } from '../../models/public-models';
import { LayerOptions, LayerConfig } from '../models/layerConfig';
import { Boundingbox } from '../models/boundingbox';
export declare abstract class BaseMap {
    serviceConfig: IZoneerderServiceConfig;
    protected buttonConfig: ButtonConfig;
    protected layerConfig: LayerConfig;
    protected extentVlaanderen: ol.Extent;
    protected geoJsonFormatter: ol.format.GeoJSON;
    protected initialized: boolean;
    protected map: ol.Map;
    protected mapnode: Element;
    protected mapProjection: ol.proj.Projection;
    bind(): void;
    updateMapSize(): void;
    zoomToExtent(extent: ol.Extent): void;
    formatGeoJson(feature: ol.geom.Geometry): Contour;
    getMapInfo(): number;
    transformBoundingboxToMapExtent(boundingbox: Boundingbox): [number, number, number, number];
    transformLatLonToPoint(lat: number, lon: number): ol.geom.Point;
    transformLambert72ToWebMercator(center: ol.Coordinate): ol.Coordinate;
    protected _createMap(): void;
    protected _createMapButtons(): void;
    protected getButtonStyle(top: number): string;
    protected setStyleToButton(target: Element, className: string, style: string): void;
    protected addZoomButton(className: string): void;
    protected addFullscreenButton(className: string): void;
    protected addZoomToExtentButton(className: string): void;
    protected addRotateButton(className: string): void;
    protected _defineProjections(): void;
    protected _createLayers(): void;
    protected _createLayer(id: string, layerOptions: LayerOptions, isBaseLayer?: boolean): ol.layer.Layer;
    private _createGrbLayer;
    private _createNgiLayer;
    private _createWmsLegend;
    private _createGrbWMSLayer;
    private _createErfgoedWMSLayer;
    private _createVectorLayer;
}
