import * as ol from 'openlayers';
export declare class Geolocate extends ol.control.Control {
    options: any;
    element: Element;
    button: HTMLButtonElement;
    geolocation: ol.Geolocation;
    positionFeature: ol.Feature;
    constructor(optOptions: any);
    private _zoomToLocation;
}
