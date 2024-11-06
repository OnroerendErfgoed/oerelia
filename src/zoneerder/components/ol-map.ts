import { bindable, LogManager, PLATFORM, autoinject } from 'aurelia-framework';
import ol from 'openlayers';
import { Contour, IAlignerResponse, IGeometryObject, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { GeozoekdienstApiService } from '../../services/geozoekdienst.api-service';
import { CrabService } from '../../services/crab.api-service';
import { IZoneerderServiceConfig } from 'exports';
import { LayerType } from '../models/layerConfig.enums';
import { DialogService } from 'aurelia-dialog';
import { BaseMap } from './base-map';
import { bindingMode } from 'aurelia-binding';
import { type Geometry } from 'geojson';
import * as moment from 'moment';
import * as jsts from 'jsts';

const log = LogManager.getLogger('ol-map');

@autoinject
export class OlMap extends BaseMap {
  @bindable disabled: boolean;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) zone: Contour;
  @bindable adrespunten?: Contour[];
  @bindable isCollapsed: boolean;
  @bindable serviceConfig: IZoneerderServiceConfig;
  @bindable showGrbTool = false;
  @bindable alignGrb?: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
  @bindable laatstGealigneerd?: string;
  @bindable showSelectGebouw: boolean;
  @bindable alignerAreaLimit: number;
  initialLaatstGealigneerd: string;

  geometryObjectList: IGeometryObject[] = [];
  WKTstring!: string;

  protected isDrawing: boolean = false;
  protected isDrawingCircle: boolean = false;
  protected selectPerceel: boolean = false;
  protected selectGebouw: boolean = false;

  @bindable private apiService: GeozoekdienstApiService;
  private drawLayer: ol.layer.Layer;

  private mapInteractions: any;
  private polygonIndex: number = 1;
  private circleIndex: number = 1;
  private totalArea = 0;
  private wktFormat: ol.format.WKT;

  constructor(
    private element: Element,
    private crabService: CrabService,
    private dialogService: DialogService
  ) {
    super();
    log.debug('olMap::constructor', this.zone);
    this._defineProjections();
    this.wktFormat = new ol.format.WKT();
  }

  attached() {
    this.initialLaatstGealigneerd = this.laatstGealigneerd;
    log.debug('olMap::attached', this.zone);
    this._createMap();
    this._createMapButtons();
    this._createLayers();
    this._createDrawLayer();
    this._createInteractions('Polygon', false);

    this.element.dispatchEvent(new CustomEvent('loaded', {
      bubbles: true
    }));

    this.drawLayer.getSource().on('addfeature', (feature: any) => {
      log.debug('olMap::drawLayer::addfeature', feature);
      this.drawLayerToZone();
      this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
    });
    this.addZoneToDrawLayer();
  }

  private addZoneToDrawLayer() {
    if (!this.drawLayer || this.geometryObjectList?.length > 0) {
      return;
    }
    const drawSource = (this.drawLayer.getSource() as ol.source.Vector);
    drawSource.getFeatures().forEach((f: any) => {
      drawSource.removeFeature(f);
    });

    if (!this.zone) {
      return;
    }

    this.zone.coordinates.forEach((coords) => {
      const polygon = new ol.geom.Polygon(coords);
      const feature = new ol.Feature({
        name: 'Zone',
        geometry: polygon
      });
      drawSource.addFeature(feature);
      this.totalArea += polygon.getArea();
    });

    if (!this.geometryObjectList.some((geometryObject) => geometryObject.name === 'Zone')) {
      const polygons = this.zone.coordinates.map((coords) => new ol.geom.Polygon(coords));
      const multiPolygon = new ol.geom.MultiPolygon(polygons.map(polygon => polygon.getCoordinates()));
      const feature = new ol.Feature({
        name: 'Zone',
        geometry: multiPolygon
      });
      const wktString = this.wktFormat.writeFeature(feature);
      this.geometryObjectList.push({ name: 'Zone', wktString });
    }
  }

  zoneChanged() {
    this.addZoneToDrawLayer();
  }

  disabledChanged(newValue: boolean, oldValue: boolean) {
    log.debug('olMap::disabledChanged', newValue, oldValue);
    if (this.initialized) {
      this.updateMapSize();
    }
  }

  zoomToFeatures() {
    this.zoomToExtent((this.drawLayer.getSource() as ol.source.Vector).getExtent());
  }

  startDrawZone(type: ol.geom.GeometryType) {
    this.resetSelect();
    this.toggleDrawZone(true, type);
    if (type === 'Polygon') {
      this.mapInteractions.drawZone.on('drawend', (evt: any) => {
        evt.feature.setProperties({ name: `Polygoon ${this.polygonIndex++}` });
        const wktString = this.wktFormat.writeFeature(evt.feature); 
        this.geometryObjectList.push({name: evt.feature.getProperties().name, wktString: wktString});
      });
    } else if (type === 'Circle') {
      this.mapInteractions.drawZone.on('drawend', (evt: any) => {
        evt.feature.setProperties({ name: `Cirkel ${this.circleIndex++}` });
        
        // Convert the circle to a polygon
        const circleGeometry = evt.feature.getGeometry();
        const polygonGeometry = ol.geom.Polygon.fromCircle(circleGeometry);
        // Create a new feature with the polygon geometry for WKT conversion
        const polygonFeature = new ol.Feature(polygonGeometry);
        const wktString = this.wktFormat.writeFeature(polygonFeature);
        this.geometryObjectList.push({
          name: evt.feature.getProperties().name, 
          wktString: wktString
        });
      });
    }
  }

  importAdrespunten() {
    if (this.adrespunten && this.adrespunten.length > 0) {
      this.adrespunten.forEach((a: Contour) => {
        this.apiService.searchPerceel(a.coordinates[0], this.mapProjection.getCode()).then((result: any) => {
          this.geoJsonFormatter.readFeatures(result).forEach((perceel) => {
            const name = 'Adrespunten';
            perceel.set('name', name);
            (this.drawLayer.getSource() as ol.source.Vector).addFeature(perceel);
            if (!this.geometryObjectList.some((geometryObject) => geometryObject.name === name)) {
              this.geometryObjectList.push({name: name, wktString: ''});
            }
          });
        });
      });
    } else {
      toastr.error('Er kan geen algemene locatie afgeleid worden omdat geen enkel locatie-element een punt bevat.');
    }
  }

  startPerceelSelect() {
    this.toggleDrawZone(false);
    this.resetSelect();
    this.selectPerceel = true;
    this.map.on('click', (evt: any) => {
      log.debug('Perceelselect', evt);
      this.apiService.searchPerceel(evt.coordinate, this.mapProjection.getCode()).then((result: any) => {
        this.geoJsonFormatter.readFeatures(result).forEach((perceel) => {
          this.drawPerceel(perceel);
        });
      });
    });
  }

    startGebouwSelect() {
    this.toggleDrawZone(false);
    this.resetSelect();
    this.selectGebouw = true;
    this.map.on('click', (evt: any) => {
      log.debug('GebouwSelect', evt);
      this.apiService.searchGebouw(evt.coordinate, this.mapProjection.getCode()).then((result: any) => {
        this.geoJsonFormatter.readFeatures(result).forEach((perceel) => {
          this.drawGebouw(perceel);
        });
      });
    });
  }


  drawPerceel(olFeature: ol.Feature) {
    if (olFeature) {
      const name = `Perceel ${olFeature.get('CAPAKEY')}`;
      if (!this.geometryObjectList.some((geometryObject) => geometryObject.name === name)) {
        olFeature.set('name', name);
        (this.drawLayer.getSource() as ol.source.Vector).addFeature(olFeature);
        const wktString = this.wktFormat.writeFeature(olFeature);    
        this.geometryObjectList.push({name: name, wktString: wktString});
      }
    } else {
      toastr.error('Er werd geen perceel gevonden op deze locatie.');
    }
  }

  drawGebouw(olFeature: ol.Feature) {
    if (olFeature) {
      const name = `Gebouw ${olFeature.get('OIDN')}`;
      if (!this.geometryObjectList.some((geometryObject) => geometryObject.name === name)) {
        olFeature.set('name', name);
        (this.drawLayer.getSource() as ol.source.Vector).addFeature(olFeature);
        const wktString = this.wktFormat.writeFeature(olFeature);
        this.geometryObjectList.push({name: name, wktString: wktString});
      }
    } else {
      toastr.error('Er werd geen gebouw gevonden op deze locatie.');
    }
  }

  drawWKTzone(wkt: ol.Feature) {
    try {
      const featureFromWKT = this.wktFormat.readFeature(wkt);
      const name = `Polygoon ${this.polygonIndex++}`;
      featureFromWKT.setProperties({
        name: name
      });
      (this.drawLayer.getSource() as ol.source.Vector).addFeature(featureFromWKT);
      this.geometryObjectList.push({name: name, wktString: this.WKTstring });
      this.zoomToFeatures();
      this.WKTstring = '';
    } catch (error) {
      toastr.error(error, 'Dit is een ongeldige WKT geometrie.');
    }
  }

  removeGeometryObject(name: string) {
    const drawLayerSource = this.drawLayer.getSource() as ol.source.Vector;
    const featuresToRemove = drawLayerSource.getFeatures().filter((feature) =>
      feature.getProperties().name === name);
    featuresToRemove.forEach((featureToRemove) => {
      drawLayerSource.removeFeature(featureToRemove);
    })
    this.drawLayerToZone();
    if (this.zone.coordinates.length === 0) {
      this.zone = null;
    }

    const index = this.geometryObjectList.findIndex((geom) => geom.name === name);
    this.geometryObjectList.splice(index, 1);
  }

  geoLocationClick() {
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

  zoomButtonClick() {
    const view = this.map.getView();
    const center = view.getCenter();
    const zoom = view.getZoom();
    const coordinates = this.transformLambert72ToWebMercator(center);

    //Zoom * 2 is some kind of hack so the zoom levels somewhat align with the zoom levels on crabpyUrl.
    // Change if a better solution is found.
    window.open((this.serviceConfig.crabpyUrl) + '/#zoom=' + zoom * 2 + '&lat=' + coordinates[1] + '&lon=' + coordinates[0]);
  }

  private drawLayerToZone() {
    this.totalArea = 0;
    const multiPolygon = new ol.geom.MultiPolygon([], 'XY');
    const features: ol.Feature[] = (this.drawLayer.getSource() as ol.source.Vector).getFeatures();

    features.forEach((feature: ol.Feature) => {
      const geom = feature.getGeometry();
      if (geom instanceof ol.geom.Polygon) {
        multiPolygon.appendPolygon(geom as ol.geom.Polygon);
        this.totalArea += geom.getArea();
      } else if (geom instanceof ol.geom.MultiPolygon) {
        geom.getPolygons().forEach((polygon: ol.geom.Polygon) => {
          multiPolygon.appendPolygon(polygon);
          this.totalArea += polygon.getArea();
        });
      } else if (geom instanceof ol.geom.Circle) {
        multiPolygon.appendPolygon(ol.geom.Polygon.fromCircle(geom));
        this.totalArea += Math.PI * Math.pow(geom.getRadius(), 2);
      }
    });

    const contour = this.formatGeoJson(multiPolygon);
    !!this.zone ? this.zone.coordinates = contour.coordinates
      : this.zone = new Contour(contour);
    this.laatstGealigneerd = undefined;
  }

  private resetSelect() {
    this.selectPerceel = false;
    this.selectGebouw = false;
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

    if (!bool) {
      this.mapInteractions.drawZone.removeEventListener('drawend');
    }
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

  private _createDrawLayer() {
    // Vector layer
    this.drawLayer = this._createLayer('drawLayer', {
      type: LayerType.Vector,
      style: {
        stroke: 'rgb(39, 146, 195)',
        fill: 'rgba(39, 146, 195, 0.3)',
      },
      title: 'Zone',
      visible: true
    });
    this.map.addLayer(this.drawLayer);
  }

  showZoneVergelijkingDialog() {
    void this.dialogService.open({
      viewModel: PLATFORM.moduleName(
        'oerelia/zoneerder/components/zone-vergelijking-dialog'),
      model: { zone: this.zone, alignGrb: this.alignGrb, laatstGealigneerd: this.laatstGealigneerd },
      host: this.mapnode
    }).whenClosed((response) => {
      if (!response.wasCancelled) {
        const geom = response.output.resultaat as Geometry;
        const multiPolygon = this.createMultiPolygon(geom['geometries'] || [geom]);
        this.zone = this.formatGeoJson(multiPolygon);
        setTimeout(() => {
          // timeout to make sure drawLayerToZone was called before updating laatstGealigneerd
          this.laatstGealigneerd = response.output.laatstGealigneerd;
        });
      }
    });
  }

  private createMultiPolygon(geometries: Geometry[]) {
    const parser = new jsts.io.GeoJSONReader();
    const geoWriter = new jsts.io.GeoJSONWriter();
    const factory = new jsts.geom.GeometryFactory();

    let unionedGeom = factory.createMultiPolygon([]);
    geometries.forEach((geom: Geometry) => {
      if (geom.type === 'Polygon' || geom.type === 'MultiPolygon') {
        const polygon = parser.read(geom);
        unionedGeom = unionedGeom.union(polygon);
      }
    });
    if (unionedGeom instanceof jsts.geom.Polygon){
      unionedGeom = factory.createMultiPolygon([unionedGeom]);
    }
    return this.geoJsonFormatter.readGeometry(geoWriter.write(unionedGeom));
  }

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY [om] HH:mm');
  }
}
