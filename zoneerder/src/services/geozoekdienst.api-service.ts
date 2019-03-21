import { HttpClient } from 'aurelia-http-client';
import * as ol from 'openlayers';
import * as toastr from 'toastr';

export class GeozoekdienstApiService {
  constructor(
    private http: HttpClient,
    private config: any
  ) {
    this.http = new HttpClient();
    this.http.configure(x => {
      x.withHeader('Accept', 'application/json');
      x.withInterceptor({
        responseError(res) {
          toastr.error(res.content.message);
          return res;
        }
      });
    });
  }

  /**
   * Get Geo zoek diensten objecten
   * @param geometrie
   * @returns {Promise<any>}
   */
  public getGeozoekDienstObjecten(geometrie): Promise<any> {
    const content = {
      categorie: 'aanduidingsobjecten',
      geometrie: geometrie
    };

    return this.http.createRequest(this.config.geozoekdienstUrl)
      .asPost()
      .withContent(content)
      .send()
      .then(response => {
        if (response.isSuccess) {
          return response.content;
        } else {
          return null;
        }
      });
  }

  public searchBeschermingen(coordinate, srsname): Promise<any> {
    const featureTypes = [
      'vioe_geoportaal:beschermde_landschappen',
      'vioe_geoportaal:beschermde_dorps_en_stadsgezichten',
      'vioe_geoportaal:beschermde_archeologische_zones',
      'vioe_geoportaal:beschermde_monumenten'
    ];

    let params = 'service=wfs&version=1.1.0&request=GetFeature';
    params += '&srsname=' + srsname;
    params += '&bbox=' + this.createBbox(coordinate).join(',');
    params += '&typename=' + featureTypes.join(',');
    params += '&outputFormat=application/json';

    return this.http.createRequest(`${this.config.beschermingWfsUrl}?${params}`)
      .asGet()
      .send()
      .then((response) => {
        if (response.isSuccess) {
          return response.content;
        }
      });
  }

  public searchPerceel(coordinate, srsname): Promise<any> {
    // todo: kan via een GET call gebeuren:
    // https://geoservices.informatievlaanderen.be/overdrachtdiensten/GRB/wfs?
    // service=WFS&request=getFeature&typeNames=GRB:ADP&srsName=EPSG:31370&cql_filter=.
    // INTERSECTS(SHAPE,%20POINT(126460.95527100001%20154113.8250585))&outputFormat=application/json

    const filter = new ol.format.filter.Intersects(
      'SHAPE',
      new ol.geom.Point(coordinate, 'XY'),
      'urn:x-ogc:def:crs:EPSG:31370'
    );

    const featureRequest = new ol.format.WFS().writeGetFeature({
      srsName: srsname,
      featureNS: 'informatievlaanderen.be/grb',
      featurePrefix: 'GRB',
      featureTypes: ['ADP'],
      outputFormat: 'application/json',
      filter: filter
    });

    return this.http.createRequest(this.config.agivGrbUrl)
      .asPost()
      .withContent(new XMLSerializer().serializeToString(featureRequest))
      .withHeader('Content-Type', 'application/xml')
      .send()
      .then((response) => {
        if (response.isSuccess) {
          return response.content;
        }
      });
  }

  private createBbox(coordinate) {
    const buffer = 0.5;
    return [
      coordinate[0] - buffer,
      coordinate[1] - buffer,
      coordinate[0] + buffer,
      coordinate[1] + buffer
    ];
  }
}
