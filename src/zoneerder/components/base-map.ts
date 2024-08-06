import { LogManager, autoinject, bindable } from 'aurelia-framework';
import ol from 'openlayers';
import proj4 from 'proj4';
import { ButtonConfig } from '../models/buttonConfig';
import { Contour } from '../models/contour';
import { IZoneerderServiceConfig } from '../../models/public-models';
import {
  LayerOptions,
  LayerConfig,
  VectorLayerOptions,
  GrbWmsLayerOptions,
  WmsLayerOptions
} from '../models/layerConfig';
import { LayerType } from '../models/layerConfig.enums';
import { Layerswitcher } from './ol-layerswitcher';
import { defaultButtonConfig } from '../models/buttonConfig.defaults';
import { defaultLayerConfig } from '../models/layerConfig.defaults';
import { Boundingbox } from '../models/boundingbox';

const log = LogManager.getLogger('ol-map');

@autoinject
export abstract class BaseMap {
  @bindable serviceConfig: IZoneerderServiceConfig;
  
  @bindable protected buttonConfig: ButtonConfig;
  @bindable protected layerConfig: LayerConfig;
  protected extentVlaanderen: ol.Extent = [9928.0, 66928.0, 272072.0, 329072.0];
  protected geoJsonFormatter: ol.format.GeoJSON;
  protected initialized = false;
  protected map: ol.Map;
  protected mapnode: Element;
  protected mapProjection: ol.proj.Projection;
  
  bind() {
    this.buttonConfig = this.buttonConfig || defaultButtonConfig;
    this.layerConfig = this.layerConfig || defaultLayerConfig;
  }
  
  updateMapSize() {
    log.debug('olMap::updateMapSize');
    this.map.updateSize();
  }
  
  zoomToExtent(extent: ol.Extent) {
    this.updateMapSize();
    this.map.getView().fit(extent, { maxZoom: 14 });
  }
  
  
  formatGeoJson(feature: ol.geom.Geometry) {
    const geojson: object = this.geoJsonFormatter.writeGeometryObject(feature);
    // hack to add crs. todo: remove when https://github.com/openlayers/ol3/issues/2078 is fixed
    Object.defineProperty(geojson, 'crs', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        type: 'name', properties: {
          name: 'urn:ogc:def:crs:EPSG::31370'
        }
      }
    });
    return geojson as Contour;
  }
  
  getMapInfo() {
    return this.map.getView().getZoom();
  }
  
  transformBoundingboxToMapExtent(boundingbox: Boundingbox) {
    const lowerleft = this.transformLatLonToPoint(boundingbox.lowerleft.lat, boundingbox.lowerleft.lon);
    const upperright = this.transformLatLonToPoint(boundingbox.upperright.lat, boundingbox.upperright.lon);
    return ([lowerleft.getCoordinates()[0], lowerleft.getCoordinates()[1],
      upperright.getCoordinates()[0], upperright.getCoordinates()[1]] as ol.Extent);
  }
  
  transformLatLonToPoint(lat: number, lon: number) {
    const point: ol.geom.Point = new ol.geom.Point([lon, lat]);
    return (point.transform('EPSG:4326', 'EPSG:31370') as ol.geom.Point);
  }
  
  transformLambert72ToWebMercator(center: ol.Coordinate): ol.Coordinate {
    const point: ol.geom.Point = new ol.geom.Point([center[0], center[1]]);
    const transFormedPoint = (point.transform('EPSG:31370', 'EPSG:3857') as ol.geom.Point);
    
    return transFormedPoint.getCoordinates();
  }
  
  protected _createMap() {
    const target = this.mapnode;
    this.map = new ol.Map({
      layers: [],
      target: target,
      view: new ol.View({
        center: ol.extent.getCenter(this.mapProjection.getExtent()),
        projection: this.mapProjection,
        zoom: 2,
        maxZoom: 21
      }),
      controls: ol.control.defaults({
        attribution: false,
        rotate: false,
        zoom: false
      })
    });
    
    this.map.addControl(new ol.control.ScaleLine());
    this.map.addControl(new ol.control.Attribution({
      collapsible: false
    }));
    
    this.map.addControl(new Layerswitcher({
      tipLabel: 'Verander de kaartlagen',
      title: 'Kaartlagen'
    }));
    this.map.getView().fit(this.mapProjection.getExtent());
    this.updateMapSize();
    
    this.initialized = true;
  }
  
  protected _createMapButtons(): void {
    const buttonHeight = 2.2;
    const target = this.map.getTargetElement();
    let top = 0.8;
    
    if (this.buttonConfig.fullscreen) {
      const className = 'full-screen';
      const style = this.getButtonStyle(top);
      this.addFullscreenButton(className);
      this.setStyleToButton(target, className, style);
      top += buttonHeight;
    }
    
    if (this.buttonConfig.zoomInOut) {
      const className = 'zoom';
      const style = this.getButtonStyle(top);
      this.addZoomButton(className);
      this.setStyleToButton(target, className, style);
      top += 3.8;
    }
    
    const className = 'layer-switcher';
    const style = this.getButtonStyle(top);
    this.setStyleToButton(target, className, style);
    top += buttonHeight;
    
    if (this.buttonConfig.zoomFullExtent) {
      const className = 'fullextent';
      const style = this.getButtonStyle(top);
      this.addZoomToExtentButton(className);
      this.setStyleToButton(target, className, style);
      top += buttonHeight;
    }
    
    if (this.buttonConfig.zoomGeoLocation) {
      const className = 'geolocation';
      const style = this.getButtonStyle(top);
      this.setStyleToButton(target, className, style);
      top += buttonHeight;
    }
    
    if (this.buttonConfig.rotate) {
      const className = 'rotate';
      const style = this.getButtonStyle(top);
      this.addRotateButton(className);
      this.setStyleToButton(target, className, style);
      top += buttonHeight;
    }
    
    if (this.buttonConfig.zoomSwitcher) {
      const className = 'zoom-switcher';
      const style = this.getButtonStyle(top);
      this.setStyleToButton(target, className, style);
    }
  }
  
  protected getButtonStyle(top: number): string {
    return 'top: ' + top + 'em; left: ' + .5 + 'em;'
  }
  
  protected setStyleToButton(target: Element, className: string, style: string) {
    target.getElementsByClassName(className)
      .item(0)
      .setAttribute('style', style);
  }
  
  protected addZoomButton(className: string): void {
    this.map.addControl(new ol.control.Zoom({
      zoomInTipLabel: 'Zoom in',
      zoomOutTipLabel: 'Zoom uit',
      className: className
    }));
  }
  
  protected addFullscreenButton(className: string): void {
    this.map.addControl(new ol.control.FullScreen({
      tipLabel: 'Vergroot / verklein het scherm',
      className: className,
      label: ''
    }));
  }
  
  protected addZoomToExtentButton(className: string) {
    this.map.addControl(new ol.control.ZoomToExtent({
      extent: this.mapProjection.getExtent(),
      tipLabel: 'Zoom naar Vlaanderen',
      className: className,
      label: ''
    }));
  }
  
  protected addRotateButton(className: string): void {
    this.map.addControl(new ol.control.Rotate({
      tipLabel: 'Draai de kaart naar het noorden',
      className: className
    }));
  }
  
  protected _defineProjections() {
    // Define projection EPSG:31370
    proj4.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 ' +
      '+lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl ' +
      '+towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs'); // epsg.io
    
    // Define aliases
    proj4.defs('urn:ogc:def:crs:EPSG::31370', proj4.defs('EPSG:31370'));
    proj4.defs('urn:ogc:def:crs:EPSG:6.9:31370', proj4.defs('EPSG:31370'));
    proj4.defs('urn:x-ogc:def:crs:EPSG:31370', proj4.defs('EPSG:31370'));
    proj4.defs('http://www.opengis.net/gml/srs/epsg.xml#31370', proj4.defs('EPSG:31370'));
    
    // Define projection EPSG:3812
    proj4.defs('EPSG:3812', '+proj=lcc +lat_1=49.83333333333334 +lat_2=51.16666666666666 ' +
      '+lat_0=50.797815 +lon_0=4.359215833333333 +x_0=649328 +y_0=665262 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 ' +
      '+units=m +no_defs');
    
    ol.proj.setProj4(proj4); // define as global proj4 for OpenLayers
    const projection: ol.proj.Projection = ol.proj.get('EPSG:31370');
    projection.setExtent(this.extentVlaanderen);
    this.mapProjection = projection;
    
    this.geoJsonFormatter = new ol.format.GeoJSON({
      defaultDataProjection: this.mapProjection,
      featureProjection: this.mapProjection
    });
  }
  
  protected _createLayers() {
    log.debug('Create layers', this.layerConfig);
    //BaseLayers
    const layers = Object.keys(this.layerConfig.baseLayers)
      .map((id) => ({ id, options: this.layerConfig.baseLayers[id] }))
      .map(({ id, options }) => this._createLayer(id, options, true))
    const baseLayerGroup = new ol.layer.Group({ layers });
    baseLayerGroup.set('title', 'Achtergrond kaart');
    this.map.addLayer(baseLayerGroup);
    
    // Overlays
    const overlays = Object.keys(this.layerConfig.overlays)
      .map((id) => ({ id, options: this.layerConfig.overlays[id] }))
      .map(({ id, options }) => this._createLayer(id, options, false))
    overlays.forEach((layer) => this.map.addLayer(layer));
  }
  
  protected _createLayer(id: string, layerOptions: LayerOptions, isBaseLayer = false) {
    let layer: ol.layer.Layer;
    
    if (layerOptions.type === LayerType.GRB || layerOptions.type === LayerType.DHMV || layerOptions.type === LayerType.OMWRGBMRVL) layer = this._createGrbLayer(id, layerOptions.type);
    else if (layerOptions.type === LayerType.GrbWMS) layer = this._createGrbWMSLayer(layerOptions);
    else if (layerOptions.type === LayerType.ErfgoedWms) layer = this._createErfgoedWMSLayer(layerOptions.wmsLayers);
    else if (layerOptions.type === LayerType.Ngi) layer = this._createNgiLayer(id);
    else if (layerOptions.type === LayerType.Vector) layer = this._createVectorLayer(layerOptions);
    else throw new Error('Unknown layer type: ' + layerOptions.type);
    
    layer.set('title', layerOptions.title)
    layer.set('type', isBaseLayer ? 'base' : 'overlay')
    layer.set('layerType', layerOptions.type);
    layer.setVisible(!!layerOptions.visible)
    layer.set('showLegend', !!layerOptions.showLegend);
    
    return layer;
  }
  
  private _createGrbLayer(grbLayerId: string, type: LayerType) {
    const resolutions: number[] = [];
    const matrixIds: string[] = [];
    const maxResolution = ol.extent.getWidth(this.mapProjection.getExtent()) / 256;
    const origin = ol.extent.getTopLeft(this.mapProjection.getExtent())
    
    for (let i: number = 0; i < 16; i++) {
      matrixIds[i] = i.toString();
      resolutions[i] = maxResolution / Math.pow(2, i);
    }
    
    return new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: '//geo.api.vlaanderen.be/' + type + '/wmts',
        layer: grbLayerId,
        matrixSet: 'BPL72VL',
        format: 'image/png',
        projection: this.mapProjection,
        style: '',
        tileGrid: new ol.tilegrid.WMTS({ origin, resolutions, matrixIds }),
        attributions: '© <a href="https://www.vlaanderen.be/digitaal-vlaanderen" target="_blank" ' +
          'title="Informatie Vlaanderen" class="copyrightLink">Digitaal Vlaanderen</a>'
      }),
      extent: this.mapProjection.getExtent()
    });
  }
  
  private _createNgiLayer(layerId: string) {
    const matrixIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const resolutions = [1058.3333333327998, 529.1666666663999, 211.66666666656, 132.29166666659998, 66.14583333344,
      26.45833333332, 13.22916666666, 6.614583333344, 2.6458333333319994, 1.3229166666659997, 0.6614583333343999];
    const origin: ol.Coordinate = [450000, 800000];
    
    return new ol.layer.Tile({
      source: new ol.source.WMTS({
        urls: ['https://cartoweb.wmts.ngi.be/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
        requestEncoding: 'REST',
        layer: layerId,
        matrixSet: '3812',
        format: 'image/png',
        projection: 'EPSG:3812',
        style: 'default',
        tileGrid: new ol.tilegrid.WMTS({ origin, resolutions, matrixIds }),
        attributions: '© <a href="https://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
          'class="copyrightLink">NGI</a>'
      }),
      visible: false
      // extent: this.mapProjection.getExtent()
    });
  }
  
  private _createWmsLegend(baseUrl: string, layer: ol.layer.Tile, layerOptions: WmsLayerOptions) {
    if (layerOptions.showLegend) {
      const layers = layerOptions.wmsLayers.split(' ');
      const legendItems = layers.map((layer) =>
        baseUrl +
        '?REQUEST=GetLegendGraphic' +
        '&VERSION=1.0.0&FORMAT=image/png' +
        '&WIDTH=20&HEIGHT=20' +
        '&LEGEND_OPTIONS=forceLabels:on;fontAntiAliasing:true;fontSize:10;fontColor:ffffff;' +
        '&TRANSPARENT=true' +
        '&LAYER=' + layer);
      layer.set('legendItems', legendItems);
    }
  }
  
  private _createGrbWMSLayer(layerOptions: GrbWmsLayerOptions) {
    const url = '//geo.api.vlaanderen.be/' + LayerType.GRB + '/wms';
    const layer = new ol.layer.Tile({
      extent: this.mapProjection.getExtent(),
      source: new ol.source.TileWMS(({
        url,
        params: { LAYERS: layerOptions.wmsLayers, TILED: true },
        serverType: 'geoserver'
      })),
      maxResolution: 2000,
      visible: false
    });
    this._createWmsLegend(url, layer, layerOptions);
    return layer;
  }
  
  private _createErfgoedWMSLayer(wmsLayers: string) {
    return new ol.layer.Tile({
      extent: this.mapProjection.getExtent(),
      source: new ol.source.TileWMS(({
        url: this.serviceConfig.beschermingenWMSUrl || 'https://geo.onroerenderfgoed.be/geoserver/wms',
        params: { LAYERS: wmsLayers, TILED: true },
        serverType: 'geoserver',
        attributions: '© <a href="https://www.onroerenderfgoed.be">Onroerend Erfgoed</a>'
      })),
      maxResolution: 2000,
      visible: false
    });
  }
  
  private _createPattern(color) {
    const spacing = 10;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = spacing; // Pattern size
    
    // Draw diagonal lines
    context.strokeStyle = color; // Custom stroke color
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(spacing, spacing);
    context.moveTo(-spacing, 0);
    context.lineTo(0, spacing);
    context.moveTo(spacing, 0);
    context.lineTo(2 * spacing, spacing);
    context.stroke();
    
    return context.createPattern(canvas, 'repeat');
  }
  
  
  private _createVectorLayer(options: VectorLayerOptions) {
    // delete layer if it exists on map
    const existingLayer = this.map.getLayers().getArray().find((layer) => layer.get('title') === options.title);
    if (existingLayer) {
      this.map.removeLayer(existingLayer);
    }
    
    const vectorSource: ol.source.Vector = new ol.source.Vector({});
    const textStyleFunction = (feature: any) => {
      const text = feature.get('name') ? feature.get('name') : '';
      return new ol.style.Text({
        font: '10px Verdana',
        text: text,
        fill: new ol.style.Fill({
          color: options.style.stroke
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 3
        })
      });
    };
    
    const styleFunction = (feature: any) => {
      const styleText = textStyleFunction(feature);
      let fillColor: string | CanvasPattern = options.style.fill;
      if (options.style.hashed) {
        fillColor = this._createPattern(options.style.fill);
      }
      const style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: options.style.stroke,
          width: 3,
          lineDash: options.style.lineDash
        }),
        fill: new ol.style.Fill({
          color: fillColor
        }),
        text: styleText
      });
      return [style];
    };
    
    const vLayer: ol.layer.Vector = new ol.layer.Vector({
      source: vectorSource,
      style: styleFunction,
      visible: true
    });
    
    if (options.geometries) {
      options.geometries.forEach((geometry) => {
        geometry.coordinates.forEach((coords) => {
          const geom = new ol.geom.Polygon(coords);
          const feature = new ol.Feature(geom);
          vectorSource.addFeature(feature);
        });
      });
    }
    vLayer.set('style', options.style);
    return vLayer;
  }
  
}
