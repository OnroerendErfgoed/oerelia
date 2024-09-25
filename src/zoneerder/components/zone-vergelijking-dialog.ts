import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum, AlignGrb } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';
import { type Geometry } from 'geojson'

@autoinject
export class ZoneVergelijkingDialog {
  zone: Contour;
  buttonConfig: ButtonConfig;
  layerConfig = refentielaagLayerConfig;
  alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
  laatstGealigneerd: string;
  resultaat: Geometry;

  constructor(public controller: DialogController) {
  }

  activate(model: {
    zone: Contour,
    alignGrb: AlignGrb,
    laatstGealigneerd: string,
  }) {
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
    const originalLaatstGealigneerd = model.laatstGealigneerd;
    setTimeout(() => {
      // timeout to make sure drawLayerToZone was called before setting the initial laatstGealigneerd
      this.laatstGealigneerd = originalLaatstGealigneerd;
    });
  }

  neemResultaatOverVanZone() {
    void this.controller.ok({ resultaat: this.resultaat, laatstGealigneerd: this.laatstGealigneerd });
  }
}
