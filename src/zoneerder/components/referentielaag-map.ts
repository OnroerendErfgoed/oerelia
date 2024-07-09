import { bindable } from 'aurelia-framework';
import proj4 from 'proj4';
import ol from 'openlayers';
import { Layerswitcher } from './ol-layerswitcher';
import { LayerConfig, LayerOptions } from '../models/layerConfig';
import { LayerType } from '../models/layerConfig.enums';
import { IZoneerderServiceConfig } from 'exports';
import { Contour } from '../models/contour';
import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';

export class ReferentieLaagMap {
  @bindable serviceConfig: IZoneerderServiceConfig;
  @bindable zone: Contour;

  @bindable private layerConfig: LayerConfig;

  private mapProjection: ol.proj.Projection;
  private extentVlaanderen: ol.Extent = [9928.0, 66928.0, 272072.0, 329072.0];
  private geoJsonFormatter: ol.format.GeoJSON;

  private map: ol.Map;
  private referentielaagNode: Element;
  private initialized: boolean = false;
  private drawLayer: ol.layer.Layer;

  constructor() {
    this._defineProjections();
  }

  attached() {
    this._createMap();
    this._createMapButtons();
    this._createLayers();

    this.addZoneToDrawLayer();
    this.drawLayer.getSource().on('addfeature', (feature: any) => {
      this.drawLayerToZone();
    });
  }

  bind() {
    this.layerConfig = this.layerConfig || refentielaagLayerConfig;
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

  private _createMap() {
    const target = this.referentielaagNode;
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

  private updateMapSize() {
    this.map.updateSize();
  }

  private _createLayers() {
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
      title: 'Input/afbakening',
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
    if (layerOptions.className) {
      layer.set('className', 'grb-legende-afbakening');
    }

    layer.setVisible(!!layerOptions.visible)

    return layer;
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
      visible: true,
    });
    vLayer.set('title', options.title);
    vLayer.set('type', 'overlay');

    return vLayer;
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
    const service = this.serviceConfig ? this.serviceConfig.beschermingenWMSUrl || 'https://geo.onroerenderfgoed.be/geoserver/wms' : 'https://geo.onroerenderfgoed.be/geoserver/wms';
    return new ol.layer.Tile({
      extent: this.mapProjection.getExtent(),
      source: new ol.source.TileWMS(({
        url: service,
        params: { LAYERS: wmsLayers, TILED: true },
        serverType: 'geoserver',
        attributions: '© <a href="https://www.onroerenderfgoed.be">Onroerend Erfgoed</a>'
      })),
      maxResolution: 2000,
      visible: false
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
    if (!this.zone) {
      return;
    }
    this.zone.coordinates.forEach((coords: any) => {
      const polygon = new ol.geom.Polygon(coords);
      const feature = new ol.Feature({
        name: 'Zone',
        geometry: polygon
      });
      drawSource.addFeature(feature);
    });
    this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
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

  private _createMapButtons(): void {
    const buttonHeight = 2.2;
    const target = this.map.getTargetElement();
    let top = 0.8;

    this.addFullscreenButton('full-screen');
    this.setStyleToButton(target, 'full-screen', this.getButtonStyle(top));
    top += buttonHeight;

    this.addZoomButton('zoom');
    this.setStyleToButton(target, 'zoom', this.getButtonStyle(top));
    top += 3.8;

    // const className = 'layer-switcher';
    // const style = this.getButtonStyle(top);
    // this.setStyleToButton(target, className, style);
    // top += buttonHeight;

    // if (this.buttonConfig.zoomFullExtent) {
    //   const className = 'fullextent';
    //   const style = this.getButtonStyle(top);
    //   this.addZoomToExtentButton(className);
    //   this.setStyleToButton(target, className, style);
    //   top += buttonHeight;
    // }

    // if (this.buttonConfig.zoomGeoLocation) {
    //   const className = 'geolocation';
    //   const style = this.getButtonStyle(top);
    //   this.setStyleToButton(target, className, style);
    //   top += buttonHeight;
    // }

    // if (this.buttonConfig.rotate) {
    //   const className = 'rotate';
    //   const style = this.getButtonStyle(top);
    //   this.addRotateButton(className);
    //   this.setStyleToButton(target, className, style);
    //   top += buttonHeight;
    // }

    // if (this.buttonConfig.zoomSwitcher) {
    //   const className = 'zoom-switcher';
    //   const style = this.getButtonStyle(top);
    //   this.setStyleToButton(target, className, style);
    // }
  }

  private getButtonStyle(top: number): string {
    return 'top: ' + top + 'em; left: ' + .5 + 'em;'
  }

  private addFullscreenButton(className: string): void {
    this.map.addControl(new ol.control.FullScreen({
      tipLabel: 'Vergroot / verklein het scherm',
      className: className,
      label: ''
    }));
  }

  private setStyleToButton(target: Element, className: string, style: string) {
    target.getElementsByClassName(className)
      .item(0)
      .setAttribute('style', style);
  }

  private addZoomButton(className: string): void {
    this.map.addControl(new ol.control.Zoom({
      zoomInTipLabel: 'Zoom in',
      zoomOutTipLabel: 'Zoom uit',
      className: className
    }));
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

  zoomToExtent(extent: ol.Extent) {
    this.updateMapSize();
    this.map.getView().fit(extent, { maxZoom: 14 });
  }
}
