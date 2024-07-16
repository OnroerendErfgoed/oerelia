import { Contour } from '../models/contour';
import { ButtonConfig } from '../models/buttonConfig';
import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';

export class ZoneVergelijkingDialog {
  zone: Contour;
  buttonConfig: ButtonConfig;
  layerConfig = refentielaagLayerConfig;
  
  activate(model: { zone: Contour }) {
    this.zone = model.zone;
    this.buttonConfig = {
      zoomFullExtent: true,
      fullscreen: true,
      zoomGeoLocation: false,
      rotate: false,
      zoomSwitcher: false,
      zoomInOut: true,
    };
  }
}
