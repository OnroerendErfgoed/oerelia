import { bindable } from 'aurelia-framework';
import { OlMap } from './components/ol-map';

export class Zoneerder {
  @bindable public locatie: any;
  @bindable public disabled: boolean;
  private map: OlMap;

  public onMapLoaded($event) {
    console.debug('tab-locatie::onMapLoaded', $event, this.map.getMapInfo());
  }

  public resize() {
    if (this.map) {
      this.map.updateMapSize();
    }
  }
}
