import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import * as ol from 'openlayers';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';

declare const oeAppConfig: any;

@inject(HttpClient)
export class GeozoekdienstApiService {
  constructor(
    private http: HttpClient
  ) {
    this.http = new HttpClient();
    this.http.configure(x => {
      x.withHeader('Accept', 'application/json');
      x.withInterceptor({
        responseError(res) {
          RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
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

    return this.http.createRequest(`${oeAppConfig.crabpyUrl}/zoekdiensten/afbakeningen`)
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

    return this.http.createRequest(oeAppConfig.agivGrbUrl)
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
}
