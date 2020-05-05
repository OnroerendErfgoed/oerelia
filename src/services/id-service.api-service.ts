import { HttpClient } from 'aurelia-http-client';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';

declare const oeAppConfig: any;

export class IdServiceApiService {
  constructor(
    private http: HttpClient,
    private ssoToken: string
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

  public getReferencesByUri(uri: string): Promise<any> {
    return this.http.createRequest(`${oeAppConfig.idServiceUrl}/registry/references?uri=${uri}`)
      .asGet()
      .withHeader('OpenAmSSOID', this.ssoToken)
      .send()
      .then(response => {
        RestMessage.display({ result: MessageParser.parseHttpResponseMessage(response) });
        if (response.isSuccess) {
          return response.content;
        }
      });
  }
}
