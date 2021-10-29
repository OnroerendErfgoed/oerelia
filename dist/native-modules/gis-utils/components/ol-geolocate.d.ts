import * as ol from 'openlayers';
export declare class Geolocate extends ol.control.Control {
    options: any;
    element: Element;
    button: HTMLButtonElement;
    geolocation: ol.Geolocation;
    constructor(optOptions: any);
    click(): void;
    private _zoomToLocation;
}
