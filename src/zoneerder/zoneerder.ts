import { bindable, bindingMode, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { OlMap } from './components/ol-map';
import { CrabService } from '../services/crab.api-service';
import { GeozoekdienstApiService } from '../services/geozoekdienst.api-service';
import { Contour } from './models/contour';
import { ButtonConfig } from './models/buttonConfig'; 
import { KadastraalPerceel } from './models/kadastraalPerceel';

@inject(HttpClient, CrabService, GeozoekdienstApiService)
export class Zoneerder {
  @bindable public locatie: any;
  @bindable public disabled: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public zone: Contour;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public kadastralePercelen: KadastraalPerceel[];
  @bindable public adrespunten: Contour[];
  @bindable public buttonConfig: ButtonConfig;

  protected suggest: { suggest: Function };
  private map: OlMap;

  constructor(
    private http: HttpClient,
    private crabService: CrabService,
    private geozoekdienstApiService: GeozoekdienstApiService
  ) {
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
    if (this.locatie) {
      this.zoomToCrab(this.locatie);
    }
  }

  public zoomToCrab(locatie: any) {
    this.crabService.geolocate(locatie.id)
      .then(geolocationresponse => {
        const extent = this.map.transformBoundingboxToMapExtent(geolocationresponse.boundingbox);
        this.map.zoomToExtent(extent);
      });
  }
}
