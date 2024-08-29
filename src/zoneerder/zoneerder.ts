import { bindable, bindingMode, inject, LogManager } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { OlMap } from './components/ol-map';
import { CrabService } from '../services/crab.api-service';
import { GeozoekdienstApiService } from '../services/geozoekdienst.api-service';
import { Contour, IAlignerResponse, ReferentielaagEnum, StrategieEnum } from './models/contour';
import { ButtonConfig } from './models/buttonConfig';
import { LayerConfig } from './models/layerConfig';
import { IZoneerderServiceConfig } from 'models/public-models';

const log = LogManager.getLogger('ol-map');

@inject(HttpClient, CrabService, GeozoekdienstApiService)
export class Zoneerder {
  @bindable locatie: any;
  @bindable disabled: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) zone: Contour;
  @bindable adrespunten?: Contour[];
  @bindable buttonConfig: ButtonConfig;
  @bindable layerConfig: LayerConfig;
  @bindable serviceConfig: IZoneerderServiceConfig;
  @bindable isCollapsed?: boolean = true;
  @bindable showGrbTool?: boolean = false;
  @bindable alignGrb?: (contour: Contour, referentielaagType: ReferentielaagEnum, openbaardomeinStrategy: StrategieEnum) => Promise<IAlignerResponse>;
  @bindable laatstGealigneerd: string;
  @bindable showSelectGebouw: boolean;
  @bindable alignerAreaLimit: number;

  protected suggest: { suggest: Function };

  private map: OlMap;

  constructor(
    private http: HttpClient,
    private crabService: CrabService,
    private geozoekdienstApiService: GeozoekdienstApiService
  ) {
    this.suggest = { suggest: (value) => this.crabService.suggestLocatie(value) };
  }

  onMapLoaded($event) {
    log.debug('tab-locatie::onMapLoaded', $event, this.map.getMapInfo());
  }

  resize() {
    if (this.map) {
      this.map.updateMapSize();
    }
  }

  locatieChanged() {
    if (this.locatie) {
      this.zoomToCrab(this.locatie);
    }
  }

  zoomToCrab(locatie: any) {
    this.crabService.geolocate(locatie.id)
      .then(geolocationresponse => {
        const extent = this.map.transformBoundingboxToMapExtent(geolocationresponse.boundingbox);
        this.map.zoomToExtent(extent);
      });
  }
}
