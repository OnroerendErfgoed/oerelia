import { bindable, bindingMode, inject, LogManager } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { OlMap } from './components/ol-map';
import { CrabService } from '../services/crab.api-service';
import { GeozoekdienstApiService } from '../services/geozoekdienst.api-service';
import { Contour } from './models/contour';
import { ButtonConfig } from './models/buttonConfig';
import { LayerConfig } from './models/layerConfig';

const log = LogManager.getLogger('ol-map');

@inject(HttpClient, CrabService, GeozoekdienstApiService)
export class Zoneerder {
  @bindable public locatie: any;
  @bindable public disabled: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public zone: Contour;
  @bindable public adrespunten?: Contour[];
  @bindable public buttonConfig: ButtonConfig;
  @bindable public layerConfig: LayerConfig;
  @bindable public isCollapsed?: boolean = true;

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
    log.debug('tab-locatie::onMapLoaded', $event, this.map.getMapInfo());
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
