import * as ol from 'openlayers';

export class MapConfig {
  public mapProjection: ol.proj.Projection;
  public useGeolocate: boolean = true;
  public useLayerswitcher: boolean = false;
  public center?: ol.Coordinate;
  public maxZoom?: number;
  public minZoom?: number;
  public zoom?: number;
  public geolocateZoom?: number;

}
