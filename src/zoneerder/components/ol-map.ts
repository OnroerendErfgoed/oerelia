import { bindingMode } from 'aurelia-binding';
import { bindable, inject } from 'aurelia-framework';
import * as ol from 'openlayers';
import proj4 from 'proj4';
import * as toastr from 'toastr';
import { Boundingbox } from '../models/boundingbox';
import { Contour } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { GeozoekdienstApiService } from '../../services/geozoekdienst.api-service';
import { Layerswitcher } from './ol-layerswitcher';

@inject(Element)
export class OlMap {
  @bindable public disabled: boolean;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public zone: Contour;
  @bindable public adrespunten: Contour[];
  public geometryObjectList: string[] = [];
  public WKTstring!: string;

  protected isDrawing: boolean = false;
  protected isDrawingCircle: boolean = false;
  protected selectPerceel: boolean = false;

  @bindable private apiService: GeozoekdienstApiService;
  @bindable private buttonConfig: ButtonConfig;
  private map: ol.Map;
  private mapProjection: ol.proj.Projection;
  private extentVlaanderen: ol.Extent = [9928.0, 66928.0, 272072.0, 329072.0];
  private drawLayer: ol.layer.Layer;
  private baseLayers: any;
  private mapInteractions: any;
  private initialized: boolean = false;
  private geoJsonFormatter: ol.format.GeoJSON;
  private mapnode: any;
  private polygonIndex: number = 1;
  private circleIndex: number = 1;

  constructor(
    private element: Element
  ) {
    console.debug('olMap::constructor', this.zone);
    this._defineProjections();
  }

  public attached() {
    console.debug('olMap::attached', this.zone);
    this._createMap();
    this._createMapButtons();
    this._createLayers();
    this._createInteractions('Polygon', false);

    this.element.dispatchEvent(new CustomEvent('loaded', {
      bubbles: true
    }));

    if (this.zone) {
      this.zone.coordinates.forEach((coords: any) => {
        const feature = new ol.Feature({
          name: 'Zone',
          geometry: new ol.geom.Polygon(coords)
        });
        (this.drawLayer.getSource() as ol.source.Vector).addFeature(feature);
      });
      this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
      this.geometryObjectList.push('Zone');
    }

    this.drawLayer.getSource().on('addfeature', (feature: any) => {
      console.debug('olMap::drawLayer::addfeature', feature);
      this.addToZone(feature);
    });
  }

  public updateMapSize() {
    console.debug('olMap::updateMapSize');
    this.map.updateSize();
  }

  public disabledChanged(newValue: boolean, oldValue: boolean) {
    console.debug('olMap::disabledChanged', newValue, oldValue);
    if (this.initialized) {
      this.updateMapSize();
    }
  }

  public setBaseLayer(layerName: string) {
    this.baseLayers.ortho.setVisible(layerName === 'ortho');
    this.baseLayers.grb.setVisible(layerName === 'grb');
    this.baseLayers.grbzw.setVisible(layerName === 'grbzw');
    this.baseLayers.topo.setVisible(layerName === 'topo');
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
    const point: ol.geom.Point = new ol.geom.Point([ lon, lat ]);
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
      console.debug('Perceelselect', evt);
      this.apiService.searchPerceel(evt.coordinate, this.mapProjection.getCode()).then( (result: any) => {
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
    const coordinates: any[] = [];
    (this.drawLayer.getSource() as ol.source.Vector).getFeatures().forEach((f: any) => {
      if (f.getProperties().name === name) {
        (this.drawLayer.getSource() as ol.source.Vector).removeFeature(f);
      } else {
        const geometry = f.getProperties().name.includes('Cirkel') ? ol.geom.Polygon.fromCircle(f.getGeometry()) 
                                                                   : f.getGeometry();
        coordinates.push(geometry.getCoordinates());
      }
    });
    if (coordinates.length > 0) {
      const multiPolygon = new ol.geom.MultiPolygon(coordinates);
      this.zone = new Contour(this.formatGeoJson(multiPolygon));
    } else {
      this.zone = null;
    }
    this.geometryObjectList.splice(this.geometryObjectList.indexOf(name), 1);
  }

  private addToZone(olFeature: ol.Feature) {
    console.debug('addToZone', olFeature);
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
    this.zone = new Contour(this.formatGeoJson(multiPolygon));
  }

  private resetSelect() {
    this.selectPerceel = false;
    (this.map as any).removeEventListener('click');
  }

  private toggleDrawZone(bool: boolean, type?: ol.geom.GeometryType) {
    type ? this._createInteractions(type, bool) : this._createInteractions('Polygon', false);

    switch(type) {
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
    console.debug('olMap::_createInteractions');
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

  private _createLayers() {
    this.baseLayers = {};
    const layerGroup: ol.layer.Group = new ol.layer.Group({
      layers: [
        this.baseLayers.ortho = this._createGrbLayer('omwrgbmrvl', 'Ortho', true),
        this.baseLayers.grb = this._createGrbLayer('grb_bsk', 'GRB-Basiskaart', true),
        this.baseLayers.grbzw = this._createGrbLayer('grb_bsk_grijs', 'GRB-Basiskaart in grijswaarden', true),
        this.baseLayers.topo = this._createNgiLayer('topo', 'Topokaart', true)
      ]
    });
    layerGroup.set('title', 'Achtergrond kaart');
    this.map.addLayer(layerGroup);

    this.setBaseLayer('grbzw');

    // Overlays
    this.map.addLayer(this._createNgiLayer('overlay', 'Topokaart overlay', false));
    this.map.addLayer(this._createGrbWMSLayer('GRB_GBG', 'GRB-Gebouwenlaag', false));
    this.map.addLayer(this._createGrbWMSLayer('GRB_ADP_GRENS', 'GRB-Percelenlaag', false));

    // Vector layer
    this.drawLayer = this._createVectorLayer({
      color: 'rgb(39, 146, 195)',
      fill: 'rgba(39, 146, 195, 0.3)',
      title: 'Zone'
    });
    this.map.addLayer(this.drawLayer);
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

  private _createGrbLayer(grbLayerId: string, title: string, isBaseLayer: boolean) {
    const resolutions: number[] = [];
    const matrixIds: string[] = [];
    const maxResolution: number = ol.extent.getWidth(this.mapProjection.getExtent()) / 256;

    for (let i: number = 0; i < 16; i++) {
      matrixIds[i] = i.toString();
      resolutions[i] = maxResolution / Math.pow(2, i);
    }

    const tileGrid: ol.tilegrid.WMTS = new ol.tilegrid.WMTS({
      origin: ol.extent.getTopLeft(this.mapProjection.getExtent()),
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    const grbSource: ol.source.WMTS = new ol.source.WMTS({
      url: '//tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts/',
      layer: grbLayerId,
      matrixSet: 'BPL72VL',
      format: 'image/png',
      projection: this.mapProjection,
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
      extent: this.mapProjection.getExtent()
    });

    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');

    return layer;
  }

  private _createNgiLayer(layerId: string, title: string, isBaseLayer: boolean) {
    const matrixIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const resolutions = [1058.3333333327998, 529.1666666663999, 211.66666666656, 132.29166666659998, 66.14583333344,
      26.45833333332, 13.22916666666, 6.614583333344, 2.6458333333319994, 1.3229166666659997, 0.6614583333343999];

    const tileGrid: ol.tilegrid.WMTS = new ol.tilegrid.WMTS({
      origin: [450000, 800000],
      resolutions: resolutions,
      matrixIds: matrixIds
    });

    const ngiSource: ol.source.WMTS = new ol.source.WMTS({
      urls: ['http://www.ngi.be/cartoweb/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
      requestEncoding: 'REST',
      layer: layerId,
      matrixSet: '3812',
      format: 'image/png',
      projection: 'EPSG:3812',
      style: 'default',
      tileGrid: tileGrid,
      attributions: [
        new ol.Attribution({
          html: '© <a href="http://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
          'class="copyrightLink">NGI</a>'
        })
      ]
    });

    const layer: ol.layer.Layer = new ol.layer.Tile({
      source: ngiSource,
      visible: false
      // extent: this.mapProjection.getExtent()
    });

    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');

    return layer;
  }

  private _createGrbWMSLayer(wmsLayers: string, title: string, isBaseLayer: boolean) {
    const layer = new ol.layer.Tile({
      extent: this.mapProjection.getExtent(),
      source: new ol.source.TileWMS(({
        url: 'http://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB/wms',
        params: { LAYERS: wmsLayers, TILED: true },
        serverType: 'geoserver'
      })),
      maxResolution: 2000,
      visible: false
    });
    layer.set('title', title);
    layer.set('type', isBaseLayer ? 'base' : 'overlay');
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
      visible: true
    });
    vLayer.set('title', options.title);
    vLayer.set('type', 'overlay');

    return vLayer;
  }

  private strip(geom: any, test: (a: any, b: any) => boolean) {
    if (!geom.length) {
      return;
    }
    if (typeof geom[0] !== 'number') {
      return geom.map((g: any) => this.strip(g, test));
    }
    return geom.filter(test);
  }

  private _createMapButtons(): void {
    const buttonHeight = 2.2;
    const target = this.map.getTargetElement();
    let top = 2.4;

    if (!this.buttonConfig) {
      return;
    }

    if (this.buttonConfig.fullscreen) {
      const style = this.getButtonStyle(top);
      this.addFullscreenButton(target, style);
      top += buttonHeight;
    }

    if (this.buttonConfig.zoomInOut) {
      const style = this.getButtonStyle(top);
      this.addZoomButton(target, style);
      top += 3.8;
    }
  }

  private getButtonStyle(top: number): string {
    return 'top: ' + top + 'em; left: ' + .5 + 'em;'
  }

  private addFullscreenButton(target: Element, style: string): void {
    const className = 'full-screen';
    
    this.map.addControl(new ol.control.FullScreen({
      tipLabel: 'Vergroot / verklein het scherm',
      className: className,
      label: ''
    }));

    target.getElementsByClassName(className)
          .item(0)
          .setAttribute('style', style);
  }

  private addZoomButton(target: Element, style: string): void {
    const className = 'zoom';

    this.map.addControl(new ol.control.Zoom({
      zoomInTipLabel: 'Zoom in',
      zoomOutTipLabel: 'Zoom uit',
      className: className
    }));

    target.getElementsByClassName('zoom')
          .item(0)
          .setAttribute('style', style);
  }
}
