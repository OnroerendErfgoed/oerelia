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
var crab_api_service_1 = require("../services/crab.api-service");
var geozoekdienst_api_service_1 = require("./services/geozoekdienst.api-service");
var contour_1 = require("./models/contour");
var Zoneerder = (function () {
    function Zoneerder(http) {
        this.http = http;
        this.disabled = false;
    }
    Zoneerder.prototype.attached = function () {
        var _this = this;
        this.crabService = new crab_api_service_1.CrabService(this.serviceConfig.crabpyUrl);
        this.geozoekdienstApiService = new geozoekdienst_api_service_1.GeozoekdienstApiService(this.http, this.serviceConfig.crabpyUrl, this.serviceConfig.agivGrbUrl);
        this.suggest = { suggest: function (value) { return _this.crabService.suggestLocatie(value); } };
    };
    Zoneerder.prototype.onMapLoaded = function ($event) {
        console.debug('tab-locatie::onMapLoaded', $event, this.map.getMapInfo());
    };
    Zoneerder.prototype.resize = function () {
        if (this.map) {
            this.map.updateMapSize();
        }
    };
    Zoneerder.prototype.locatieChanged = function () {
        if (this.locatie) {
            this.zoomToCrab(this.locatie);
        }
    };
    Zoneerder.prototype.zoomToCrab = function (locatie) {
        var _this = this;
        this.crabService.geolocate(locatie.id)
            .then(function (geolocationresponse) {
            var extent = _this.map.transformBoundingboxToMapExtent(geolocationresponse.boundingbox);
            _this.map.zoomToExtent(extent);
        });
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Zoneerder.prototype, "locatie", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], Zoneerder.prototype, "disabled", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", contour_1.Contour)
    ], Zoneerder.prototype, "zone", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], Zoneerder.prototype, "adrespunten", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], Zoneerder.prototype, "serviceConfig", void 0);
    Zoneerder = __decorate([
        aurelia_framework_1.inject(aurelia_http_client_1.HttpClient),
        __metadata("design:paramtypes", [aurelia_http_client_1.HttpClient])
    ], Zoneerder);
    return Zoneerder;
}());
exports.Zoneerder = Zoneerder;
