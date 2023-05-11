import { bindingMode } from 'aurelia-binding';
import { bindable, inject, LogManager } from 'aurelia-framework';
import ol from 'openlayers';
import proj4 from 'proj4';
import { Boundingbox } from '../models/boundingbox';
import { Contour } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { GeozoekdienstApiService } from '../../services/geozoekdienst.api-service';
import { Layerswitcher } from './ol-layerswitcher';
import { CrabService } from '../../services/crab.api-service';
import { LayerConfig, LayerOptions } from '../models/layerConfig';
import { LayerType } from '../models/layerConfig.enums';
import { defaultButtonConfig } from '../models/buttonConfig.defaults';
import { defaultLayerConfig } from '../models/layerConfig.defaults';
import { IZoneerderServiceConfig } from 'exports';

const log = LogManager.getLogger('ol-map');

@inject(Element, CrabService)
export class OlMap {
  @bindable public disabled: boolean;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public zone: Contour;
  @bindable public adrespunten?: Contour[];
  @bindable public isCollapsed: boolean;
  @bindable public serviceConfig: IZoneerderServiceConfig;

  public geometryObjectList: string[] = [];
  public WKTstring!: string;

  protected isDrawing: boolean = false;
  protected isDrawingCircle: boolean = false;
  protected selectPerceel: boolean = false;

  @bindable private apiService: GeozoekdienstApiService;
  @bindable private buttonConfig: ButtonConfig;
  @bindable private layerConfig: LayerConfig;
  private map: ol.Map;
  private mapProjection: ol.proj.Projection;
  private extentVlaanderen: ol.Extent = [9928.0, 66928.0, 272072.0, 329072.0];
  private drawLayer: ol.layer.Layer;
  private baseLayers: { [key: string]: ol.layer.Layer };
  private mapInteractions: any;
  private initialized: boolean = false;
  private geoJsonFormatter: ol.format.GeoJSON;
  private mapnode: any;
  private polygonIndex: number = 1;
  private circleIndex: number = 1;

  constructor(
    private element: Element,
    private crabService: CrabService
  ) {
    log.debug('olMap::constructor', this.zone);
    this._defineProjections();
  }

  public attached() {
    log.debug('olMap::attached', this.zone);
    this._createMap();
    this._createMapButtons();
    this._createLayers();
    this._createInteractions('Polygon', false);

    this.element.dispatchEvent(new CustomEvent('loaded', {
      bubbles: true
    }));
    this.addZoneToDrawLayer();
    this.drawLayer.getSource().on('addfeature', (feature: any) => {
      log.debug('olMap::drawLayer::addfeature', feature);
      this.drawLayerToZone();
    });
  }

  private addZoneToDrawLayer() {
    if (!this.drawLayer) {
      return;
    }
    const drawSource = (this.drawLayer.getSource() as ol.source.Vector);
    drawSource.getFeatures().forEach((f: any) => {
      drawSource.removeFeature(f);
    });
    this.geometryObjectList = [];
    if (!this.zone) {
      return;
    }
    this.zone.coordinates.forEach((coords: any) => {
      const feature = new ol.Feature({
        name: 'Zone',
        geometry: new ol.geom.Polygon(coords)
      });
      drawSource.addFeature(feature);
    });
    if (this.geometryObjectList.indexOf('Zone') === -1) {
        this.geometryObjectList.push('Zone');
    }
    this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
  }

  public zoneChanged(zone) {
    this.addZoneToDrawLayer();
  }

  public bind() {
    this.buttonConfig = this.buttonConfig || defaultButtonConfig;
    this.layerConfig = this.layerConfig || defaultLayerConfig;
  }

  public updateMapSize() {
    log.debug('olMap::updateMapSize');
    this.map.updateSize();
  }

  public disabledChanged(newValue: boolean, oldValue: boolean) {
    log.debug('olMap::disabledChanged', newValue, oldValue);
    if (this.initialized) {
      this.updateMapSize();
    }
  }

  public zoomToExtent(extent: ol.Extent) {
    this.updateMapSize();
    this.map.getView().fit(extent, { maxZoom: 14 });
  }

  public zoomToFeatures() {
    this.zoomToExtent((this.drawLayer.getSource() as ol.source.Vector).getExtent());
  }

  public getMapInfo() {
    return this.map.getView().getZoom();
  }

  public formatGeoJson(feature: ol.geom.Geometry) {
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

  public transformBoundingboxToMapExtent(boundingbox: Boundingbox) {
    const lowerleft = this.transformLatLonToPoint(boundingbox.lowerleft.lat, boundingbox.lowerleft.lon);
    const upperright = this.transformLatLonToPoint(boundingbox.upperright.lat, boundingbox.upperright.lon);
    return ([lowerleft.getCoordinates()[0], lowerleft.getCoordinates()[1],
      upperright.getCoordinates()[0], upperright.getCoordinates()[1]] as ol.Extent);
  }

  public transformLatLonToPoint(lat: number, lon: number) {
    const point: ol.geom.Point = new ol.geom.Point([lon, lat]);
    return (point.transform('EPSG:4326', 'EPSG:31370') as ol.geom.Point);
  }

  public startDrawZone(type: ol.geom.GeometryType) {
    this.resetSelect();
    this.toggleDrawZone(true, type);

    if (type === 'Polygon') {
      this.mapInteractions.drawZone.on('drawend', (evt: any) => {
        evt.feature.setProperties({ name: `Polygoon ${this.polygonIndex++}` });
        this.geometryObjectList.push(evt.feature.getProperties().name);
      });
    } else if (type === 'Circle') {
      this.mapInteractions.drawZone.on('drawend', (evt: any) => {
        evt.feature.setProperties({ name: `Cirkel ${this.circleIndex++}` });
        this.geometryObjectList.push(evt.feature.getProperties().name);
      });
    }
  }

  public importAdrespunten() {
    if (this.adrespunten && this.adrespunten.length > 0) {
      this.adrespunten.forEach((a: Contour) => {
        this.apiService.searchPerceel(a.coordinates[0], this.mapProjection.getCode()).then((result: any) => {
          this.geoJsonFormatter.readFeatures(result).forEach((perceel) => {
            const name = 'Adrespunten';
            perceel.set('name', name);
            (this.drawLayer.getSource() as ol.source.Vector).addFeature(perceel);
            if (this.geometryObjectList.indexOf(name) === -1) {
              this.geometryObjectList.push(name);
            }
          });
        });
      });
    } else {
      toastr.error('Er kan geen algemene locatie afgeleid worden omdat geen enkel locatie-element een punt bevat.');
    }
  }

  public startPerceelSelect() {
    this.toggleDrawZone(false);
    this.selectPerceel = true;
    this.map.on('click', (evt: any) => {
      log.debug('Perceelselect', evt);
      this.apiService.searchPerceel(evt.coordinate, this.mapProjection.getCode()).then((result: any) => {
        this.geoJsonFormatter.readFeatures(result).forEach((perceel) => { this.drawPerceel(perceel); });
      });
    });
  }

  public drawPerceel(olFeature: ol.Feature) {
    if (olFeature) {
      const name = `Perceel ${olFeature.get('CAPAKEY')}`;
      if (this.geometryObjectList.indexOf(name) === -1) {
        olFeature.set('name', name);
        (this.drawLayer.getSource() as ol.source.Vector).addFeature(olFeature);
        this.geometryObjectList.push(name);
      }
    } else {
      toastr.error('Er werd geen perceel gevonden op deze locatie.');
    }
  }

  public drawWKTzone(wkt: ol.Feature) {
    const wktParser = new ol.format.WKT();
    try {
      const featureFromWKT = wktParser.readFeature(wkt);
      const name = `Polygoon ${this.polygonIndex++}`;
      featureFromWKT.setProperties({
        name: name
      });
      (this.drawLayer.getSource() as ol.source.Vector).addFeature(featureFromWKT);
      this.geometryObjectList.push(name);
      this.zoomToFeatures();
      this.WKTstring = '';
    } catch (error) {
      toastr.error(error, 'Dit is een ongeldige WKT geometrie.');
    }
  }

  public removeGeometryObject(name: string) {
    const drawLayerSource = this.drawLayer.getSource() as  ol.source.Vector;
    const featuresToRemove = drawLayerSource.getFeatures().filter((feature) =>
      feature.getProperties().name === name);
    featuresToRemove.forEach((featureToRemove)=>{
      drawLayerSource.removeFeature(featureToRemove);
    })
    this.drawLayerToZone();
    if (this.zone.coordinates.length === 0) {
      this.zone = null;
    }

    this.geometryObjectList.splice(this.geometryObjectList.indexOf(name), 1);
  }

  public geoLocationClick() {
    const view = this.map.getView();
    const geolocation = new ol.Geolocation({
      projection: this.map.getView().getProjection(),
      trackingOptions: {
        enableHighAccuracy: true
      }
    });

    geolocation.setTracking(true);
    geolocation.once('change:position', () => {
      view.setCenter(geolocation.getPosition());
      view.setZoom(18);
      geolocation.setTracking(false);
    });
  }

  public zoomButtonClick() {
    const view = this.map.getView();
    const center = view.getCenter();
    const zoom = view.getZoom();
    const coordinates = this.transformLambert72ToWebMercator(center);

    //Zoom * 2 is some kind of hack so the zoom levels somewhat align with the zoom levels on crabpyUrl.
    // Change if a better solution is found.
    window.open((this.serviceConfig.crabpyUrl) + '/#zoom=' + zoom * 2 + '&lat=' + coordinates[1] + '&lon=' + coordinates[0]);
  }

  private drawLayerToZone() {
    const multiPolygon = new ol.geom.MultiPolygon([], 'XY');
    const features: ol.Feature[] = (this.drawLayer.getSource() as ol.source.Vector).getFeatures();
    features.forEach((feature: ol.Feature) => {
      const geom = feature.getGeometry();
      if (geom instanceof ol.geom.Polygon) {
        multiPolygon.appendPolygon(geom as ol.geom.Polygon);
      } else if (geom instanceof ol.geom.MultiPolygon) {
        geom.getPolygons().forEach((polygon: ol.geom.Polygon) => {
          multiPolygon.appendPolygon(polygon);
        });
      } else if (geom instanceof ol.geom.Circle) {
        multiPolygon.appendPolygon(ol.geom.Polygon.fromCircle(geom));
      }
    });

    const contour = this.formatGeoJson(multiPolygon);
    !!this.zone ? this.zone.coordinates = contour.coordinates
      : this.zone = new Contour(contour);
  }

  private resetSelect() {
    this.selectPerceel = false;
    (this.map as any).removeEventListener('click');
  }

  private toggleDrawZone(bool: boolean, type?: ol.geom.GeometryType) {
    type ? this._createInteractions(type, bool) : this._createInteractions('Polygon', false);

    switch (type) {
      case 'Polygon': {
        this.isDrawing = bool;
        this.isDrawingCircle = false;
        break;
      }
      case 'Circle': {
        this.isDrawing = false;
        this.isDrawingCircle = bool;
        break;
      }
      default: {
        this.isDrawing = false;
        this.isDrawingCircle = false;
        break;
      }
    }

    if (!bool) { this.mapInteractions.drawZone.removeEventListener('drawend'); }
  }

  private _createMap() {
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

  private _createInteractions(type: ol.geom.GeometryType, setActive: boolean) {
    log.debug('olMap::_createInteractions');
    // Zone interactions

    this.map.getInteractions().pop();

    const drawZoneInteraction: ol.interaction.Draw = new ol.interaction.Draw({
      type: (type),
      source: this.drawLayer.getSource() as ol.source.Vector,
      freehand: false
    });
    this.map.addInteraction(drawZoneInteraction);
    drawZoneInteraction.setActive(setActive);

    this.mapInteractions = {
      drawZone: drawZoneInteraction
    };
  }

  private _defineProjections() {
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

  private _createLayers() {
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

    // Vector layer
    this.drawLayer = this._createVectorLayer({
      color: 'rgb(39, 146, 195)',
      fill: 'rgba(39, 146, 195, 0.3)',
      title: 'Zone'
    });
    this.map.addLayer(this.drawLayer);
  }

  private _createLayer(id: string, layerOptions: LayerOptions, isBaseLayer: boolean) {
    let layer: ol.layer.Layer;

    if (layerOptions.type === LayerType.GRB || layerOptions.type === LayerType.DHMV || layerOptions.type === LayerType.OMWRGBMRVL) layer = this._createGrbLayer(id, layerOptions.type);
    else if (layerOptions.type === LayerType.GrbWMS) layer = this._createGrbWMSLayer(layerOptions.wmsLayers);
    else if (layerOptions.type === LayerType.ErfgoedWms) layer = this._createErfgoedWMSLayer(layerOptions.wmsLayers);
    else if (layerOptions.type === LayerType.Ngi) layer = this._createNgiLayer(id);

    layer.set('title', layerOptions.title)
    layer.set('type', isBaseLayer ? 'base' : 'overlay')
    layer.setVisible(!!layerOptions.visible)

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

  private _createGrbWMSLayer(wmsLayers: string) {
    return new ol.layer.Tile({
      extent: this.mapProjection.getExtent(),
      source: new ol.source.TileWMS(({
        url: '//geo.api.vlaanderen.be/' + LayerType.GRB + '/wms',
        params: { LAYERS: wmsLayers, TILED: true },
        serverType: 'geoserver'
      })),
      maxResolution: 2000,
      visible: false
    });
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

  private _createVectorLayer(options: any) {
    const vectorSource: ol.source.Vector = new ol.source.Vector({});
    const textStyleFunction = (feature: any) => {
      const text = feature.get('name') ? feature.get('name') : '';
      return new ol.style.Text({
        font: '10px Verdana',
        text: text,
        fill: new ol.style.Fill({
          color: options.color
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 3
        })
      });
    };

    const styleFunction = (feature: any) => {
      const styleText = textStyleFunction(feature);
      const style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: options.color,
          width: 3
        }),
        fill: new ol.style.Fill({
          color: options.fill
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
    vLayer.set('title', options.title);
    vLayer.set('type', 'overlay');

    return vLayer;
  }

  private _createMapButtons(): void {
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

  private addFullscreenButton(className: string): void {
    this.map.addControl(new ol.control.FullScreen({
      tipLabel: 'Vergroot / verklein het scherm',
      className: className,
      label: ''
    }));
  }

  private addZoomButton(className: string): void {
    this.map.addControl(new ol.control.Zoom({
      zoomInTipLabel: 'Zoom in',
      zoomOutTipLabel: 'Zoom uit',
      className: className
    }));
  }

  private addZoomToExtentButton(className: string) {
    this.map.addControl(new ol.control.ZoomToExtent({
      extent: this.mapProjection.getExtent(),
      tipLabel: 'Zoom naar Vlaanderen',
      className: className,
      label: ''
    }));
  }

  private addRotateButton(className: string): void {
    this.map.addControl(new ol.control.Rotate({
      tipLabel: 'Draai de kaart naar het noorden',
      className: className
    }));
  }

  private getButtonStyle(top: number): string {
    return 'top: ' + top + 'em; left: ' + .5 + 'em;'
  }

  private setStyleToButton(target: Element, className: string, style: string) {
    target.getElementsByClassName(className)
      .item(0)
      .setAttribute('style', style);
  }

  private transformLambert72ToWebMercator(center: ol.Coordinate): ol.Coordinate {
    const point: ol.geom.Point = new ol.geom.Point([center[0], center[1]]);
    const transFormedPoint = (point.transform('EPSG:31370', 'EPSG:3857') as ol.geom.Point);

    return transFormedPoint.getCoordinates();
  }
}
