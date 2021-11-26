import * as ol from 'openlayers';
export declare class MapConfig {
    mapProjection: ol.proj.Projection;
    useGeolocate: boolean;
    useLayerswitcher: boolean;
    center?: ol.Coordinate;
    maxZoom?: number;
    minZoom?: number;
    zoom?: number;
    geolocateZoom?: number;
}
