import { Contour } from '../models/contour';
import { BaseMap } from './base-map';
import { bindable } from 'aurelia-framework';
import { LayerType } from '../models/layerConfig.enums';

export class ReferentieLaagMap extends BaseMap {
  @bindable zone: Contour;
  
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
      title: 'Input',
      style: {
        stroke: 'rgb(39, 146, 195)',
        fill: 'rgba(39, 146, 195, 0.3)'
      },
      geometries: [this.zone],
      showLegend: true,
      visible: true
    });
    this.map.addLayer(inputLayer);
    this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());}
}
