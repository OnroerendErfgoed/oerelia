import * as ol from 'openlayers';
export declare class Geolocate extends ol.control.Control {
    options: any;
    element: Element;
    button: HTMLButtonElement;
    drawAction: any;
    geolocation: ol.Geolocation;
    constructor(optOptions: any);
    private _zoomToLocation;
}
