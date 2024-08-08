import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';

export class ZoneVergelijkingDialog {
  zone: Contour;
  buttonConfig: ButtonConfig;
  layerConfig = refentielaagLayerConfig;
  alignGrb: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;

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
}
