var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindable, bindingMode, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { CrabService } from '../services/crab.api-service';
import { GeozoekdienstApiService } from './services/geozoekdienst.api-service';
import { Contour } from './models/contour';
var Zoneerder = (function () {
    function Zoneerder(http) {
        this.http = http;
        this.disabled = false;
    }
    Zoneerder.prototype.attached = function () {
        var _this = this;
        this.crabService = new CrabService(this.serviceConfig.crabpyUrl);
        this.geozoekdienstApiService = new GeozoekdienstApiService(this.http, this.serviceConfig.crabpyUrl, this.serviceConfig.agivGrbUrl);
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
        bindable,
        __metadata("design:type", Object)
    ], Zoneerder.prototype, "locatie", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], Zoneerder.prototype, "disabled", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Contour)
    ], Zoneerder.prototype, "zone", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Array)
    ], Zoneerder.prototype, "adrespunten", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], Zoneerder.prototype, "serviceConfig", void 0);
    Zoneerder = __decorate([
        inject(HttpClient),
        __metadata("design:paramtypes", [HttpClient])
    ], Zoneerder);
    return Zoneerder;
}());
export { Zoneerder };
