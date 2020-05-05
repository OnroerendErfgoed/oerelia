"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_http_client_1 = require("aurelia-http-client");
var restMessage_1 = require("../utilities/message/restMessage");
var messageParser_1 = require("../utilities/message/messageParser");
var IdServiceApiService = (function () {
    function IdServiceApiService(http) {
        this.http = http;
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
    IdServiceApiService = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_http_client_1.HttpClient])
    ], IdServiceApiService);
    return IdServiceApiService;
}());
exports.IdServiceApiService = IdServiceApiService;

//# sourceMappingURL=id-service.api-service.js.map
