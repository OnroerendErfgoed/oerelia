import ol from 'openlayers';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { CrabService } from '../../services/crab.api-service';
import { IZoneerderServiceConfig } from 'exports';
import { DialogService } from 'aurelia-dialog';
import { BaseMap } from './base-map';
export declare class OlMap extends BaseMap {
    private element;
    private crabService;
    private dialogService;
    disabled: boolean;
    zone: Contour;
    adrespunten?: Contour[];
    isCollapsed: boolean;
    serviceConfig: IZoneerderServiceConfig;
    showGrbTool: boolean;
    alignGrb?: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
    laatstGealigneerd?: string;
    showSelectGebouw: boolean;
    initialLaatstGealigneerd: string;
    geometryObjectList: string[];
    WKTstring: string;
    protected isDrawing: boolean;
    protected isDrawingCircle: boolean;
    protected selectPerceel: boolean;
    protected selectGebouw: boolean;
    private apiService;
    private drawLayer;
    private mapInteractions;
    private polygonIndex;
    private circleIndex;
    private totalArea;
    constructor(element: Element, crabService: CrabService, dialogService: DialogService);
    attached(): void;
    private addZoneToDrawLayer;
    zoneChanged(): void;
    disabledChanged(newValue: boolean, oldValue: boolean): void;
    zoomToFeatures(): void;
    startDrawZone(type: ol.geom.GeometryType): void;
    importAdrespunten(): void;
    startPerceelSelect(): void;
    startGebouwSelect(): void;
    drawPerceel(olFeature: ol.Feature): void;
    drawGebouw(olFeature: ol.Feature): void;
    drawWKTzone(wkt: ol.Feature): void;
    removeGeometryObject(name: string): void;
    geoLocationClick(): void;
    zoomButtonClick(): void;
    private drawLayerToZone;
    private resetSelect;
    private toggleDrawZone;
    private _createInteractions;
    private _createDrawLayer;
    showZoneVergelijkingDialog(): void;
    private createMultiPolygon;
    formatDate(date: any): string;
}
