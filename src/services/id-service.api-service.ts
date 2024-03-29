import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';
import { Message } from '../utilities/message/message';
import { IHttpResponse } from 'models/public-models';
import { IIdServiceResponse } from './models/idServiceResponse';

declare const oeAppConfig: any;

@autoinject
export class IdServiceApiService {
  public ssoToken: string;

  constructor(
    private http: HttpClient
  ) {
    this.http = new HttpClient();
    this.http.configure(x => {
      x.withHeader('Accept', 'application/json');
      x.withInterceptor({
        responseError(res) {
          RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
          throw res;
        }
      });
    });
  }

  public getReferencesByUri(uri: string): Promise<any> {
    return this.http.createRequest(`${oeAppConfig.idServiceUrl}/registry/references?uri=${uri}`)
      .asGet()
      .withHeader('Authorization', 'Bearer ' + this.ssoToken)
      .send()
      .then(response => {
        RestMessage.display({result: MessageParser.parseHttpResponseMessage(response)});
        if (response.isSuccess) {
          return response.content;
        }
      });
  }

  public async getByUri<T>(uri: string, getSso: () => Promise<string>): Promise<IHttpResponse<T>> {
    const sso = await getSso();
    const response = await this.http.createRequest(`${oeAppConfig.idServiceUrl + '/uris?uri=' + uri}`)
      .asGet()
      .withHeader('Authorization', 'Bearer ' + sso)
      .send() as IHttpResponse<IIdServiceResponse>;

    if (!response.content.location) {
      Message.error({
        title: 'Fout',
        message: `Er ging iets mis bij het ophalen van uri: ${uri}`
      });
      throw `Could not retrieve uri ${uri}`;
    }

    const locationResponse = await this.http.createRequest(response.content.location).asGet()
      .withHeader('Authorization', 'Bearer ' + sso)
      .send() as IHttpResponse<T>;

    const content = locationResponse.content;
    const etag = locationResponse.headers.get('ETag');
    return {...locationResponse, content: {...content, etag}};
  }
}
