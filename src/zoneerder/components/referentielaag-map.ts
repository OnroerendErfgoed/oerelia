import * as ol from 'openlayers';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { BaseMap } from './base-map';
import { bindable } from 'aurelia-framework';
import { LayerType } from '../models/layerConfig.enums';

export class ReferentieLaagMap extends BaseMap {
  @bindable zone: Contour;
  @bindable alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;

  private resultLayer: ol.layer.Layer;
  private diffPlusLayer: ol.layer.Layer;
  private diffMinLayer: ol.layer.Layer;
  
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
  
  createResultLayer(geometry: Contour) {
    const resultLayer = this._createLayer('input', {
      type: LayerType.Vector,
      title: 'Output/Resultaat',
      style: {
        stroke: 'rgb(255, 0, 0)',
        fill: '#ffffff',
        lineDash: [3, 3],
      },
      geometries: [geometry],
      showLegend: true,
      visible: true
    });
    this.map.addLayer(resultLayer);
    return resultLayer;
  }
  
  createDiffPlusLayer(geometry: Contour) {
    const diffPlusLayer = this._createLayer('diffPlus', {
      type: LayerType.Vector,
      title: 'Diff+',
      style: {
        stroke: 'rgb(255, 0, 0)',
        fill: 'rgba(0, 255, 0, 0.3)',
        hashed: true,
      },
      geometries: [geometry],
      showLegend: true,
      visible: true
    });
    this.map.addLayer(diffPlusLayer);
    return diffPlusLayer;
  }
  
  createDiffMinLayer(geometry: Contour) {
    const diffMinLayer = this._createLayer('diffMin', {
      type: LayerType.Vector,
      title: 'Diff-',
      style: {
        stroke: 'rgb(255, 0, 0)',
        fill: 'rgba(255, 0, 0, 0.3)',
        hashed: true,
      },
      geometries: [geometry],
      showLegend: true,
      visible: true
    });
    this.map.addLayer(diffMinLayer);
    return diffMinLayer;
  }
  
  resultsUpdated(results: { [key: string]: Contour }) {
    if (!results) {
      this.map.removeLayer(this.resultLayer)
      this.map.removeLayer(this.diffPlusLayer);
      this.map.removeLayer(this.diffMinLayer);
      this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
      return;
    }
    this.resultLayer = this.createResultLayer(results['result']);
    this.diffPlusLayer = this.createDiffPlusLayer(results['result_diff_plus']);
    this.diffMinLayer = this.createDiffMinLayer(results['result_diff_min']);
    this.zoomToExtent(this.geoJsonFormatter.readGeometry(results['result']).getExtent());
  }
}
