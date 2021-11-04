import * as ol from 'openlayers';
export declare class Geolocate extends ol.control.Control {
    options: any;
    element: Element;
    button: HTMLButtonElement;
    layer: ol.layer.Vector;
    geolocation: ol.Geolocation;
    positionFeature: ol.Feature;
    constructor(optOptions: any);
    private _zoomToLocation;
    private _createLayer;
}
