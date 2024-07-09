import { Contour } from '../models/contour';

export class ZoneVergelijkingDialog {
  zone: Contour;
  activate(model: { zone: Contour }) {
    this.zone = model.zone;
  }
}