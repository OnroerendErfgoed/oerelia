"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_http_client_1 = require("aurelia-http-client");
var restMessage_1 = require("../utilities/message/restMessage");
var messageParser_1 = require("../utilities/message/messageParser");
var IdServiceApiService = (function () {
    function IdServiceApiService(http, ssoToken) {
        this.http = http;
        this.ssoToken = ssoToken;
        this.http = new aurelia_http_client_1.HttpClient();
        this.http.configure(function (x) {
            x.withHeader('Accept', 'application/json');
            x.withInterceptor({
                responseError: function (res) {
                    restMessage_1.RestMessage.display({ result: messageParser_1.MessageParser.parseHttpResponseMessage(res) });
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
            restMessage_1.RestMessage.display({ result: messageParser_1.MessageParser.parseHttpResponseMessage(response) });
            if (response.isSuccess) {
                return response.content;
            }
        });
    };
    return IdServiceApiService;
}());
exports.IdServiceApiService = IdServiceApiService;

//# sourceMappingURL=id-service.api-service.js.map
