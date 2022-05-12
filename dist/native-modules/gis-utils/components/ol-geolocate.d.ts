import * as ol from 'openlayers';
export declare class Geolocate extends ol.control.Control {
    options: any;
    element: Element;
    layer: ol.layer.Vector;
    constructor(optOptions: any);
    private _zoomToLocation;
    private _createLayer;
    private _createFeature;
    private _addPositionFeature;
}
