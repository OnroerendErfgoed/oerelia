import * as ol from 'openlayers';
import { Boundingbox } from './models/boundingbox';
import { Geolocate } from './components/ol-geolocate';
import { Layerswitcher, LayerswitcherPanel } from './components/ol-layerswitcher';

declare const jsts: any;

export class MapConfig {
  constructor(
    public mapProjection: ol.proj.Projection,
    public useGeolocate: boolean = true,
    public useLayerswitcher: boolean = false,
    public center?: ol.Coordinate,
    public maxZoom?: number,
    public minZoom?: number,
    public zoom?: number,
    public geolocateZoom?: number
  ) {}
}

export class MapUtil {

  public static transformBoundingboxToMapExtent(boundingbox: Boundingbox) {
    const lowerleft = this.transformLatLonToPoint(boundingbox.lowerleft.lat, boundingbox.lowerleft.lon);
    const upperright = this.transformLatLonToPoint(boundingbox.upperright.lat, boundingbox.upperright.lon);
    return ([lowerleft.getCoordinates()[0], lowerleft.getCoordinates()[1],
      upperright.getCoordinates()[0], upperright.getCoordinates()[1]] as ol.Extent);
  }

  public static transformLatLonToPoint(lat: number, lon: number) {
    const point: ol.geom.Point = new ol.geom.Point([ lon, lat ]);
    return (point.transform('EPSG:4326', 'EPSG:31370') as ol.geom.Point);
  }

  public static createGrbLayer(grbLayerId: string, title: string, isBaseLayer: boolean, visible: boolean,
                               mapProjection: ol.proj.Projection) {
    const resolutions: number[] = [];
    const matrixIds: string[] = [];
    const maxResolution: number = ol.extent.getWidth(mapProjection.getExtent()) / 256;

    for (let i: number = 0; i < 16; i++) {
      matrixIds[i] = i.toString();
      resolutions[i] = maxResolution / Math.pow(2, i);
    }

    const tileGrid: ol.tilegrid.WMTS = new ol.tilegrid.WMTS({
      origin: ol.extent.getTopLeft(mapProjection.getExtent()),
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    const grbSource: ol.source.WMTS = new ol.source.WMTS({
      url: '//tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts/',
      layer: grbLayerId,
      matrixSet: 'BPL72VL',
      format: 'image/png',
      projection: mapProjection,
      style: '',
      tileGrid: tileGrid,
      attributions: [
        new ol.Attribution({
          html: '© <a href="https://overheid.vlaanderen.be/informatie-vlaanderen" target="_blank" ' +
            'title="Informatie Vlaanderen" class="copyrightLink">Informatie Vlaanderen</a>'
        })
      ]
    });

    const layer: ol.layer.Layer = new ol.layer.Tile({
      source: grbSource,
      extent: mapProjection.getExtent(),
      visible: visible
    });

    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');

    return layer;
  }

  public static createVectorLayer(options: any) {
    const vectorSource: ol.source.Vector = new ol.source.Vector({});
    const textStyleFunction = (feature: ol.Feature, resolution) => {
      let text = feature.get('name') ? feature.get('name') : '';
      if (options.maxLabelResolution && resolution > options.maxLabelResolution) {
        text = '';
      }
      return new ol.style.Text({
        font: '10px Verdana',
        text: feature.get('show') ? text : '',
        fill: new ol.style.Fill({
          color: options.color
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 3
        })
      });
    };

    const styleFunction = (feature: ol.Feature, resolution) => {
      const styleText: ol.style.Text = textStyleFunction(feature, resolution);
      const showFeature = feature.get('show');

      if (showFeature) {
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: options.color,
            width: 3
          }),
          fill: new ol.style.Fill({
            color: options.fill
          }),
          text: styleText
        });
      } else {
        return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgba(0,0,0,0)',
            width: 1
          }),
          fill: new ol.style.Fill({
            color: 'rgba(0,0,0,0)'
          }),
          text: styleText
        });
      }
    };

    const vLayer: ol.layer.Vector = new ol.layer.Vector({
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

    const tileGrid: ol.tilegrid.WMTS = new ol.tilegrid.WMTS({
      origin: [450000, 800000],
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    const ngiSource: ol.source.WMTS = new ol.source.WMTS({
      urls: ['https://www.ngi.be/cartoweb/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
      requestEncoding: 'REST',
      layer: layerId,
      matrixSet: '3812',
      format: 'image/png',
      projection: 'EPSG:3812',
      style: 'default',
      tileGrid: tileGrid,
      attributions: [
        new ol.Attribution({
          html: '© <a href="https://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
            'class="copyrightLink">NGI</a>'
        })
      ]
    });

    const layer: ol.layer.Layer = new ol.layer.Tile({
      source: ngiSource,
      visible: false
    });

    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');

    return layer;
  }

  public static createGrbWMSLayer(wmsLayers: string, title: string, isBaseLayer: boolean,
                                  mapProjection: ol.proj.Projection) {
    const layer = new ol.layer.Tile({
      extent: mapProjection.getExtent(),
      source: new ol.source.TileWMS(({
        url: 'https://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB/wms',
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

  public static createMap(target: Element, config: MapConfig): ol.Map {
    const map = new ol.Map({
      layers: [],
      target: target,
      view: new ol.View({
        center: config.center || ol.extent.getCenter(config.mapProjection.getExtent()),
        projection: config.mapProjection,
        zoom: config.zoom || 2,
        maxZoom: config.maxZoom || 21,
        minZoom: config.minZoom || 1
      }),
      controls: ol.control.defaults({
        attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
          collapsible: false
        }),
        rotate: false,
        zoom: true
      }),
      logo: false
    });

    map.addControl(new ol.control.ScaleLine());

    if (config.useGeolocate) {
      map.addControl(new Geolocate({ zoomLevel: config.geolocateZoom }));
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

  public static mergePolygons(features: ol.Feature[]): ol.Feature {
    const parser = new jsts.io.OL3Parser();
    parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon,
      ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);
    let mergedJstsGeom;
    features.forEach((f) => {
      const jstsGeom = parser.read(f.getGeometry());
      mergedJstsGeom = mergedJstsGeom ? mergedJstsGeom.union(jstsGeom) : jstsGeom;
    });

    if (mergedJstsGeom) {
      const polygon = parser.write(mergedJstsGeom);
      const coords = polygon.getType() === 'Polygon' ? [polygon.getCoordinates()] : polygon.getCoordinates();
      if (coords[0].length > 0) {
        return new ol.Feature({
          geometry: new ol.geom.MultiPolygon(coords)
        });
      } else {
        return null;
      }
    }
  }

  public static intersectPolygons(polygon1: ol.Feature, polygon2: ol.Feature): ol.Feature {
    const parser = new jsts.io.OL3Parser();
    const writer = new jsts.io.GeoJSONWriter();

    parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon,
      ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon, ol.geom.GeometryCollection);
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
      return new ol.Feature({
        geometry: new ol.geom.MultiPolygon(coords)
      });
    } else {
      return null;
    }
  }

  public static subtractPolygons(polygon1: ol.Feature, polygon2: ol.Feature): ol.Feature {
    const parser = new jsts.io.OL3Parser();
    parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon,
      ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);
    let jstsGeom;
    if (!polygon2) {
      jstsGeom = parser.read(polygon1.getGeometry());
    } else {
      jstsGeom = (parser.read(polygon1.getGeometry())).difference(parser.read(polygon2.getGeometry()));
    }

    const polygon = parser.write(jstsGeom);
    const coords = polygon.getType() === 'Polygon' ? [polygon.getCoordinates()] : polygon.getCoordinates();
    if (coords[0].length > 0) {
      return new ol.Feature({
        geometry: new ol.geom.MultiPolygon(coords)
      });
    } else {
      return null;
    }
  }

  public static getContourFromFeature(feature: ol.Feature) {
    const formatter = new ol.format.GeoJSON();

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

  public static bufferZone(zone: ol.Feature, buffer: number): ol.Feature {
    const parser = new jsts.io.OL3Parser(null, ol);
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
