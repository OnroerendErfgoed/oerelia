import * as ol from 'openlayers';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { BaseMap } from './base-map';
import { bindable } from 'aurelia-framework';
import { LayerType } from '../models/layerConfig.enums';
import { type Geometry } from 'geojson'
import { OeFullscreen } from './oe-fullscreen';

export class ReferentieLaagMap extends BaseMap {
  @bindable laatstGealigneerd: string;
  @bindable zone: Contour;
  @bindable alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
  @bindable resultaat: Geometry;

  private resultLayer: ol.layer.Layer;
  private verschilPlusLayer: ol.layer.Layer;
  private verschilMinLayer: ol.layer.Layer;

  constructor() {
    super()
    this._defineProjections();
  }

  attached() {
    this._createMap();
    this._createMapButtons();
    this._createLayers();
    const inputLayer = this._createLayer('input', {
      type: LayerType.Vector,
      title: 'Input/Afbakening',
      style: {
        stroke: 'rgb(39, 146, 195)',
        fill: 'rgba(39, 146, 195, 0.3)'
      },
      geometries: [this.zone],
      showLegend: true,
      visible: true
    });

    this.map.addLayer(inputLayer);
    this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
  }

  createResultLayer(geometry: Geometry) {
    const resultLayer = this._createLayer('input', {
      type: LayerType.Vector,
      title: 'Output/Resultaat',
      style: {
        stroke: 'rgb(0, 255, 0)',
        fill: 'rgba(255, 255, 255, 0.7)',
      },
      geometries: geometry['geometries'] || [geometry],
      showLegend: true,
      visible: true
    });
    this.map.addLayer(resultLayer);
    return resultLayer;
  }

  createVerschilPlusLayer(geometry: Geometry) {
    const verschilPlusLayer = this._createLayer('verschilPlus', {
      type: LayerType.Vector,
      title: 'Verschil +',
      style: {
        stroke: 'rgb(0, 0, 0, 0)',
        fill: 'rgba(0, 255, 0)',
        hashed: true,
      },
      geometries: geometry['geometries'] || [geometry],
      showLegend: true,
      visible: true
    });
    this.map.addLayer(verschilPlusLayer);
    return verschilPlusLayer;
  }

  createVerschilMinLayer(geometry: Geometry) {
    const verschilMinLayer = this._createLayer('verschilMin', {
      type: LayerType.Vector,
      title: 'Verschil -',
      style: {
        stroke: 'rgb(0, 0, 0, 0)',
        fill: 'rgba(255, 0, 0)',
        hashed: true,
      },
      geometries: geometry['geometries'] || [geometry],
      showLegend: true,
      visible: true
    });
    this.map.addLayer(verschilMinLayer);
    return verschilMinLayer;
  }

  resultsUpdated(results: { [key: string]: Geometry }) {
    if (!results) {
      this.map.removeLayer(this.resultLayer)
      this.map.removeLayer(this.verschilPlusLayer);
      this.map.removeLayer(this.verschilMinLayer);
      return;
    }
    this.resultaat = results['result'];
    this.resultLayer = this.createResultLayer(results['result']);
    this.verschilMinLayer = this.createVerschilMinLayer(results['result_diff_min']);
    this.verschilPlusLayer = this.createVerschilPlusLayer(results['result_diff_plus']);
  }

  protected addFullscreenButton(className: string): void {
    this.map.addControl(new OeFullscreen({
      tipLabel: 'Vergroot / verklein het scherm',
      className: className,
      label: '',
      source: this.map.getTargetElement().parentElement
    }));
  }
}
