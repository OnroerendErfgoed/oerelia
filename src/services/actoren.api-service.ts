import { HttpClient } from 'aurelia-http-client';
import { AuthenticationService } from './authentication-service';
import { autoinject } from 'aurelia-framework';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';

declare const oeAppConfig: any;

@autoinject
export class ActorenApiService {
  public rolePrefix: string = 'vioe-proces-toelatingen-beschermd-erfgoed:';
  
  constructor(
    protected http: HttpClient,
    protected authService: AuthenticationService) {
    this.authService.rolePrefix = this.rolePrefix;
    this.http = new HttpClient();
    this.http.configure(x => {
      x.withBaseUrl(oeAppConfig.baseUrl);
      x.withHeader('Accept', 'application/json');
      x.withInterceptor({
        responseError(res) {
          console.debug(res.response);
          RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
          return res;
        }
      });
    });
  }

  public getActorByUri(actorUri: string) {
    return this.http.createRequest(`${oeAppConfig.idserviceUrl}/uris?uri=${actorUri}`)
      .asGet()
      .withHeader('OpenAmSSOID', this.authService.getSsoToken())
      .send()
      .then(response => {
        RestMessage.display({ result: MessageParser.parseHttpResponseMessage(response) });

        if (response.isSuccess) {
          return response.content;
        }
      });
  }
}
