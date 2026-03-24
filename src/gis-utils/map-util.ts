import Feature from 'ol/Feature';
import { getCenter, getTopLeft, getWidth, type Extent } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import GeometryCollection from 'ol/geom/GeometryCollection';
import LineString from 'ol/geom/LineString';
import LinearRing from 'ol/geom/LinearRing';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import type { Coordinate } from 'ol/coordinate';
import { defaults as defaultControls } from 'ol/control';
import Attribution from 'ol/control/Attribution';
import ScaleLine from 'ol/control/ScaleLine';
import type Projection from 'ol/proj/Projection';
import TileWMS from 'ol/source/TileWMS';
import VectorSource from 'ol/source/Vector';
import WMTSSource from 'ol/source/WMTS';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import View from 'ol/View';
import { Geolocate } from './components/ol-geolocate';
import { Layerswitcher, LayerswitcherPanel } from './components/ol-layerswitcher';
import * as jsts from 'jsts';
import { IBoundingbox } from '../models/public-models';

export class MapConfig {
  constructor(
    public mapProjection: Projection,
    public useGeolocate: boolean = true,
    public useLayerswitcher: boolean = false,
    public center?: Coordinate,
    public maxZoom?: number,
    public minZoom?: number,
    public zoom?: number,
    public geolocateZoom?: number,
    public geolocateTracking: boolean = false
  ) {}
}

export class MapUtil {

  public static transformBoundingboxToMapExtent(boundingbox: IBoundingbox) {
    const lowerleft = this.transformLatLonToPoint(boundingbox.lowerleft.lat, boundingbox.lowerleft.lon);
    const upperright = this.transformLatLonToPoint(boundingbox.upperright.lat, boundingbox.upperright.lon);
    return ([lowerleft.getCoordinates()[0], lowerleft.getCoordinates()[1],
      upperright.getCoordinates()[0], upperright.getCoordinates()[1]] as Extent);
  }

  public static transformLatLonToPoint(lat: number, lon: number) {
    const point: Point = new Point([lon, lat]);
    return (point.transform('EPSG:4326', 'EPSG:31370') as Point);
  }

  public static createGrbLayer(grbLayerId: string, type: string, title: string, isBaseLayer: boolean, visible: boolean,
                               mapProjection: Projection) {
    const resolutions: number[] = [];
    const matrixIds: string[] = [];
    const maxResolution: number = getWidth(mapProjection.getExtent()) / 256;

    for (let i: number = 0; i < 16; i++) {
      matrixIds[i] = i.toString();
      resolutions[i] = maxResolution / Math.pow(2, i);
    }

    const tileGrid = new WMTSTileGrid({
      origin: getTopLeft(mapProjection.getExtent()),
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    const grbSource = new WMTSSource({
      url: '//geo.api.vlaanderen.be/' + type + '/wmts',
      layer: grbLayerId,
      matrixSet: 'BPL72VL',
      format: 'image/png',
      projection: mapProjection,
      style: '',
      tileGrid: tileGrid,
      attributions: '© <a href="https://overheid.vlaanderen.be/informatie-vlaanderen" target="_blank" ' +
        'title="Informatie Vlaanderen" class="copyrightLink">Informatie Vlaanderen</a>'
    });

    const layer: Layer<any> = new TileLayer({
      source: grbSource,
      extent: mapProjection.getExtent(),
      visible: visible
    });

    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');

    return layer;
  }

  public static createVectorLayer(options: any) {
    const vectorSource = new VectorSource({});
    const textStyleFunction = (feature: Feature, resolution) => {
      let text = feature.get('name') ? feature.get('name') : '';
      if (options.maxLabelResolution && resolution > options.maxLabelResolution) {
        text = '';
      }
      return new Text({
        font: '10px Verdana',
        text: feature.get('show') ? text : '',
        fill: new Fill({
          color: options.color
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3
        })
      });
    };

    const styleFunction = (feature: Feature, resolution) => {
      const styleText = textStyleFunction(feature, resolution);
      const showFeature = feature.get('show');

      if (showFeature) {
        return new Style({
          stroke: new Stroke({
            color: options.color,
            width: 3
          }),
          fill: new Fill({
            color: options.fill
          }),
          text: styleText
        });
      } else {
        return new Style({
          stroke: new Stroke({
            color: 'rgba(0,0,0,0)',
            width: 1
          }),
          fill: new Fill({
            color: 'rgba(0,0,0,0)'
          }),
          text: styleText
        });
      }
    };

    const vLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
      visible: true
    });
    vLayer.set('title', options.title);
    vLayer.set('type', 'overlay');

    return vLayer;
  }

  public static createNgiLayer(layerId: string, title: string, isBaseLayer: boolean) {
    const matrixIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const resolutions = [1058.3333333327998, 529.1666666663999, 211.66666666656, 132.29166666659998, 66.14583333344,
      26.45833333332, 13.22916666666, 6.614583333344, 2.6458333333319994, 1.3229166666659997, 0.6614583333343999];

    const tileGrid = new WMTSTileGrid({
      origin: [450000, 800000],
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    const ngiSource = new WMTSSource({
      urls: ['https://cartoweb.wmts.ngi.be/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
      requestEncoding: 'REST',
      layer: layerId,
      matrixSet: '3812',
      format: 'image/png',
      projection: 'EPSG:3812',
      style: 'default',
      tileGrid: tileGrid,
      attributions: '© <a href="https://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
        'class="copyrightLink">NGI</a>'
    });

    const layer: Layer<any> = new TileLayer({
      source: ngiSource,
      visible: false
    });

    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');

    return layer;
  }

  public static createGrbWMSLayer(wmsLayers: string, title: string, isBaseLayer: boolean,
                                  mapProjection: Projection) {
    const layer = new TileLayer({
      extent: mapProjection.getExtent(),
      source: new TileWMS(({
        url: '//geo.api.vlaanderen.be/GRB/wms',
        params: { LAYERS: wmsLayers, TILED: true },
        serverType: 'geoserver'
      })),
      maxResolution: 2000,
      visible: true
    });
    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');
    return layer;
  }

  public static createMap(target: HTMLElement, config: MapConfig): Map {
    const map = new Map({
      layers: [],
      target: target,
      view: new View({
        center: config.center || getCenter(config.mapProjection.getExtent()),
        projection: config.mapProjection,
        zoom: config.zoom || 2,
        maxZoom: config.maxZoom || 21,
        minZoom: config.minZoom || 1
      }),
      controls: defaultControls({
        attribution: false,
        rotate: false,
        zoom: true
      })
    });

    map.addControl(new ScaleLine());
    map.addControl(new Attribution({ collapsible: false }));

    if (config.useGeolocate) {
      map.addControl(new Geolocate({ zoomLevel: config.geolocateZoom,
        geolocateTracking: config.geolocateTracking }));
    }

    if (config.useLayerswitcher) {
      const layerswitcherPanel = new LayerswitcherPanel({
        title: 'Legende'
      });
      map.addControl(new Layerswitcher({
        tipLabel: 'Verander de kaartlagen',
        title: 'Kaartlagen',
        panel: layerswitcherPanel
      }));
      map.addControl(layerswitcherPanel);
    }

    return map;
  }

  public static mergePolygons(features: Feature[]): Feature {
    const parser = new jsts.io.OL3Parser();
    parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
    let mergedJstsGeom;
    features.forEach((f) => {
      const jstsGeom = parser.read(f.getGeometry());
      mergedJstsGeom = mergedJstsGeom ? mergedJstsGeom.union(jstsGeom) : jstsGeom;
    });

    if (mergedJstsGeom) {
      const polygon = parser.write(mergedJstsGeom);
      const coords = polygon.getType() === 'Polygon' ? [polygon.getCoordinates()] : polygon.getCoordinates();
      if (coords[0].length > 0) {
        return new Feature({
          geometry: new MultiPolygon(coords)
        });
      } else {
        return null;
      }
    }
  }

  public static intersectPolygons(polygon1: Feature, polygon2: Feature): Feature {
    const parser = new jsts.io.OL3Parser();
    const writer = new jsts.io.GeoJSONWriter();

    parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection);
    const jstsGeom1 = parser.read(polygon1.getGeometry());
    const jstsGeom2 = parser.read(polygon2.getGeometry());
    const intersects = jstsGeom1.intersects(jstsGeom2);

    if (!intersects) {
      return null;
    }

    const jstsGeom = polygon2 ? jstsGeom1.intersection(jstsGeom2) : jstsGeom1;
    const buffered = jstsGeom.buffer(0);
    const polygon = writer.write(buffered);
    const coords = polygon.type === 'Polygon' ? [polygon.coordinates] : polygon.coordinates;
    if (coords[0].length > 0) {
      return new Feature({
        geometry: new MultiPolygon(coords)
      });
    } else {
      return null;
    }
  }

  public static subtractPolygons(polygon1: Feature, polygon2: Feature): Feature {
    const parser = new jsts.io.OL3Parser();
    parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
    let jstsGeom;
    if (!polygon2) {
      jstsGeom = parser.read(polygon1.getGeometry());
    } else {
      jstsGeom = (parser.read(polygon1.getGeometry())).difference(parser.read(polygon2.getGeometry()));
    }

    const polygon = parser.write(jstsGeom);
    const coords = polygon.getType() === 'Polygon' ? [polygon.getCoordinates()] : polygon.getCoordinates();
    if (coords[0].length > 0) {
      return new Feature({
        geometry: new MultiPolygon(coords)
      });
    } else {
      return null;
    }
  }

  public static getContourFromFeature(feature: Feature) {
    const formatter = new GeoJSON();

    const geojson: any = formatter.writeFeatureObject(feature, {
      dataProjection: 'EPSG:31370',
      featureProjection: 'EPSG:31370'
    });
    geojson.geometry.crs = {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::31370'
      }
    };

    return geojson.geometry;
  }

  public static bufferZone(zone: Feature, buffer: number): Feature {
    const parser = new jsts.io.OL3Parser();
    parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection);
    try {
      // convert the OpenLayers geometry to a JSTS geometry
      const jstsGeom = parser.read(zone.getGeometry());
      // create a buffer
      const buffered = jstsGeom.buffer(buffer);
      // convert back from JSTS and replace the geometry on the feature
      zone.setGeometry(parser.write(buffered));
    } catch (e) {
      console.debug(e);
      return zone;
    }

    return zone;
  }
}
