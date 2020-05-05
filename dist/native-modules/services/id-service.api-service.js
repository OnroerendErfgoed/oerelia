import { HttpClient } from 'aurelia-http-client';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';
var IdServiceApiService = (function () {
    function IdServiceApiService(http, ssoToken) {
        this.http = http;
        this.ssoToken = ssoToken;
        this.http = new HttpClient();
        this.http.configure(function (x) {
            x.withHeader('Accept', 'application/json');
            x.withInterceptor({
                responseError: function (res) {
                    RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
                    return res;
                }
            });
        });
    }
    IdServiceApiService.prototype.getReferencesByUri = function (uri) {
        return this.http.createRequest(oeAppConfig.idServiceUrl + "/registry/references?uri=" + uri)
            .asGet()
            .withHeader('OpenAmSSOID', this.ssoToken)
            .send()
            .then(function (response) {
            RestMessage.display({ result: MessageParser.parseHttpResponseMessage(response) });
            if (response.isSuccess) {
                return response.content;
            }
        });
    };
    return IdServiceApiService;
}());
export { IdServiceApiService };

//# sourceMappingURL=id-service.api-service.js.map
