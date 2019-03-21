import { bindable, inject } from 'aurelia-framework';
import { OlMap } from './components/ol-map';
import { CrabService } from './services/crab.api-service';

inject(CrabService)
export class Zoneerder {
  @bindable public locatie: any;
  @bindable public disabled: boolean;
  private map: OlMap;

  constructor(private crabService: CrabService) {}

  public onMapLoaded($event) {
    console.debug('tab-locatie::onMapLoaded', $event, this.map.getMapInfo());
  }

  public resize() {
    if (this.map) {
      this.map.updateMapSize();
    }
  }
}
