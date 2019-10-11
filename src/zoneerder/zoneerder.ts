import { bindable, bindingMode, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { OlMap } from './components/ol-map';
import { CrabService } from '../services/crab.api-service';
import { GeozoekdienstApiService } from './services/geozoekdienst.api-service';
import { Contour } from './models/contour';

@inject(HttpClient)
export class Zoneerder {
  @bindable public locatie: any;
  @bindable public disabled: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public zone: Contour;
  @bindable public adrespunten: Contour[];

  protected suggest: { suggest: Function };
  private map: OlMap;
  private crabService: CrabService;
  private geozoekdienstApiService: GeozoekdienstApiService;
  @bindable private serviceConfig: { crabpyUrl: string, agivGrbUrl: string };

  constructor(private http: HttpClient) {}

  public attached() {
    this.crabService = new CrabService(this.serviceConfig.crabpyUrl);
    this.geozoekdienstApiService = new GeozoekdienstApiService(this.http,
      this.serviceConfig.crabpyUrl, this.serviceConfig.agivGrbUrl);
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
