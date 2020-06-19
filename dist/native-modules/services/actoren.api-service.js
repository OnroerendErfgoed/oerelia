var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from 'aurelia-http-client';
import { AuthenticationService } from './authentication-service';
import { autoinject } from 'aurelia-framework';
import { RestMessage } from '../utilities/message/restMessage';
import { MessageParser } from '../utilities/message/messageParser';
var ActorenApiService = (function () {
    function ActorenApiService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.rolePrefix = 'vioe-proces-toelatingen-beschermd-erfgoed:';
        this.authService.rolePrefix = this.rolePrefix;
        this.http = new HttpClient();
        this.http.configure(function (x) {
            x.withBaseUrl(oeAppConfig.baseUrl);
            x.withHeader('Accept', 'application/json');
            x.withInterceptor({
                responseError: function (res) {
                    console.debug(res.response);
                    RestMessage.display({ result: MessageParser.parseHttpResponseMessage(res) });
                    return res;
                }
            });
        });
    }
    ActorenApiService.prototype.getActorByUri = function (actorUri) {
        return this.http.createRequest(oeAppConfig.idserviceUrl + "/uris?uri=" + actorUri)
            .asGet()
            .withHeader('OpenAmSSOID', this.authService.getSsoToken())
            .send()
            .then(function (response) {
            RestMessage.display({ result: MessageParser.parseHttpResponseMessage(response) });
            if (response.isSuccess) {
                return response.content;
            }
        });
    };
    ActorenApiService = __decorate([
        autoinject,
        __metadata("design:paramtypes", [HttpClient,
            AuthenticationService])
    ], ActorenApiService);
    return ActorenApiService;
}());
export { ActorenApiService };

//# sourceMappingURL=actoren.api-service.js.map
