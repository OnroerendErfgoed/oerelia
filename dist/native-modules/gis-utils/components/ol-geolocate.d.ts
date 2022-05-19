import * as ol from 'openlayers';
export declare class Geolocate extends ol.control.Control {
    options: any;
    element: Element;
    layer: ol.layer.Vector;
    private watchId;
    constructor(optOptions: any);
    private _zoomToLocation;
    private _createLayer;
    private _createFeature;
    private _addPositionFeature;
}
