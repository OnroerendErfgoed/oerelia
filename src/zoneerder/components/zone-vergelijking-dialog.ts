import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';
import { type Geometry } from 'geojson'

@autoinject 
export class ZoneVergelijkingDialog {
  zone: Contour;
  buttonConfig: ButtonConfig;
  layerConfig = refentielaagLayerConfig;
  alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
  resultaat: Geometry;

  constructor(public controller: DialogController) { }

  activate(model: { zone: Contour, alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>; }) {
    this.zone = model.zone;
    this.buttonConfig = {
      zoomFullExtent: true,
      fullscreen: true,
      zoomGeoLocation: false,
      rotate: false,
      zoomSwitcher: false,
      zoomInOut: true,
    };
    this.alignGrb = model.alignGrb;
  }

  neemResultaatOverVanZone() {
    this.controller.ok(this.resultaat);
  }
}
