import ol from 'openlayers';
import { Boundingbox } from '../models/boundingbox';
import { Contour } from '../models/contour';
import { CrabService } from '../../services/crab.api-service';
export declare class OlMap {
    private element;
    private crabService;
    disabled: boolean;
    zone: Contour;
    adrespunten?: Contour[];
    isCollapsed: boolean;
    geometryObjectList: string[];
    WKTstring: string;
    protected isDrawing: boolean;
    protected isDrawingCircle: boolean;
    protected selectPerceel: boolean;
    private apiService;
    private buttonConfig;
    private layerConfig;
    private map;
    private mapProjection;
    private extentVlaanderen;
    private drawLayer;
    private baseLayers;
    private mapInteractions;
    private initialized;
    private geoJsonFormatter;
    private mapnode;
    private polygonIndex;
    private circleIndex;
    constructor(element: Element, crabService: CrabService);
    attached(): void;
    bind(): void;
    updateMapSize(): void;
    disabledChanged(newValue: boolean, oldValue: boolean): void;
    zoomToExtent(extent: ol.Extent): void;
    zoomToFeatures(): void;
    getMapInfo(): number;
    formatGeoJson(feature: ol.geom.Geometry): Contour;
    transformBoundingboxToMapExtent(boundingbox: Boundingbox): [number, number, number, number];
    transformLatLonToPoint(lat: number, lon: number): ol.geom.Point;
    startDrawZone(type: ol.geom.GeometryType): void;
    importAdrespunten(): void;
    startPerceelSelect(): void;
    drawPerceel(olFeature: ol.Feature): void;
    drawWKTzone(wkt: ol.Feature): void;
    removeGeometryObject(name: string): void;
    geoLocationClick(): void;
    zoomButtonClick(): void;
    private addToZone;
    private resetSelect;
    private toggleDrawZone;
    private _createMap;
    private _createInteractions;
    private _defineProjections;
    private _createLayers;
    private _createLayer;
    private _createGrbLayer;
    private _createNgiLayer;
    private _createGrbWMSLayer;
    private _createVectorLayer;
    private _createMapButtons;
    private addFullscreenButton;
    private addZoomButton;
    private addZoomToExtentButton;
    private addRotateButton;
    private getButtonStyle;
    private setStyleToButton;
    private transformLambert72ToWebMercator;
}
