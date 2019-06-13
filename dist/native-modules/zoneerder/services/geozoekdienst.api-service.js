var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import * as ol from 'openlayers';
import * as toastr from 'toastr';
var GeozoekdienstApiService = (function () {
    function GeozoekdienstApiService(http, crabpyUrl, agivGrbUrl) {
        this.http = http;
        this.crabpyUrl = crabpyUrl;
        this.agivGrbUrl = agivGrbUrl;
        this.http = new HttpClient();
        this.http.configure(function (x) {
            x.withHeader('Accept', 'application/json');
            x.withInterceptor({
                responseError: function (res) {
                    toastr.error(res.content.message);
                    return res;
                }
            });
        });
    }
    GeozoekdienstApiService.prototype.getGeozoekDienstObjecten = function (geometrie) {
        var content = {
            categorie: 'aanduidingsobjecten',
            geometrie: geometrie
        };
        return this.http.createRequest(this.crabpyUrl + "/zoekdiensten/afbakeningen")
            .asPost()
            .withContent(content)
            .send()
            .then(function (response) {
            if (response.isSuccess) {
                return response.content;
            }
            else {
                return null;
            }
        });
    };
    GeozoekdienstApiService.prototype.searchPerceel = function (coordinate, srsname) {
        var filter = new ol.format.filter.Intersects('SHAPE', new ol.geom.Point(coordinate, 'XY'), 'urn:x-ogc:def:crs:EPSG:31370');
        var featureRequest = new ol.format.WFS().writeGetFeature({
            srsName: srsname,
            featureNS: 'informatievlaanderen.be/grb',
            featurePrefix: 'GRB',
            featureTypes: ['ADP'],
            outputFormat: 'application/json',
            filter: filter
        });
        return this.http.createRequest(this.agivGrbUrl)
            .asPost()
            .withContent(new XMLSerializer().serializeToString(featureRequest))
            .withHeader('Content-Type', 'application/xml')
            .send()
            .then(function (response) {
            if (response.isSuccess) {
                return response.content;
            }
        });
    };
    GeozoekdienstApiService = __decorate([
        inject(HttpClient),
        __metadata("design:paramtypes", [HttpClient, String, String])
    ], GeozoekdienstApiService);
    return GeozoekdienstApiService;
}());
export { GeozoekdienstApiService };