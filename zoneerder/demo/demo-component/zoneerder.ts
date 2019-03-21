import { bindable, inject } from 'aurelia-framework';
import { OlMap } from './components/ol-map';
import { CrabService } from './services/crab.api-service';

inject(CrabService)
export class Zoneerder {
  @bindable public locatie: any;
  @bindable public disabled: boolean;
  protected suggest: any;
  private map: OlMap;

  constructor(private crabService: CrabService) {
    this.suggest = { suggest: (value) => this.crabService.suggestLocatie(value) };
  }

  public onMapLoaded($event) {
    console.debug('tab-locatie::onMapLoaded', $event, this.map.getMapInfo());
  }

  public resize() {
    if (this.map) {
      this.map.updateMapSize();
    }
  }

  public locatieChanged() {
    this.zoomToCrab(this.locatie);
  }

  public zoomToCrab(locatie: any) {
    this.crabService.geolocate(locatie.id)
      .then(geolocationresponse => {
        const extent = this.map.transformBoundingboxToMapExtent(geolocationresponse.boundingbox);
        this.map.zoomToExtent(extent);
      });
  }
}
