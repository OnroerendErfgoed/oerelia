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
var aurelia_validation_1 = require("aurelia-validation");
var foundation_validation_renderer_1 = require("../foundation-validation-renderer/foundation-validation-renderer");
var locatie_1 = require("./models/locatie");
var crab_api_service_1 = require("../services/crab.api-service");
var AdresCrab = (function () {
    function AdresCrab(controller, controllerFactory, crabService, bindingEngine) {
        var _this = this;
        this.controller = controller;
        this.controllerFactory = controllerFactory;
        this.crabService = crabService;
        this.bindingEngine = bindingEngine;
        this.landen = [];
        this.suggest = {};
        this.controller = this.controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new foundation_validation_renderer_1.FoundationValidationRenderer());
        this.loadLanden();
        this.suggest.gemeenten = { suggest: function (value) { return _this.loadGemeenten(value); } };
        this.suggest.postcodes = { suggest: function (value) { return _this.loadPostcodes(value); } };
        this.suggest.straten = { suggest: function (value) { return _this.loadStraten(value); } };
        this.suggest.huisnummers = { suggest: function (value) { return _this.loadHuisnrs(value); } };
    }
    AdresCrab.prototype.bind = function () {
        var _this = this;
        aurelia_validation_1.ValidationRules
            .ensure('land').required()
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .ensure('huisnummer').required()
            .on(this.data);
        aurelia_validation_1.ValidationRules
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .ensure('huisnummer').required()
            .on(this);
        this.bindingEngine
            .propertyObserver(this.data, 'land')
            .subscribe(function (nv, ov) {
            _this.landChanged(nv, ov);
        });
        this.data.land = this.data.land || 'BE';
        if (this.data.land !== 'BE') {
            this.gemeente = this.data.gemeente ? this.data.gemeente.naam : undefined;
            this.postcode = this.data.postcode ? this.data.postcode.naam : undefined;
            this.straat = this.data.straat ? this.data.straat.naam : undefined;
            this.huisnummer = this.data.huisnummer ? this.data.huisnummer.naam : undefined;
        }
    };
    AdresCrab.prototype.parseField = function (value, property) {
        this.data[property] = { naam: value };
    };
    AdresCrab.prototype.landChanged = function (nv, ov) {
        if (nv === 'BE' || ov === 'BE') {
            this.gemeente = undefined;
            this.straat = undefined;
            this.postcode = undefined;
            this.huisnummer = undefined;
            this.data.gemeente = undefined;
            this.data.straat = undefined;
            this.data.postcode = undefined;
            this.data.huisnummer = undefined;
            this.data.subadres = undefined;
        }
    };
    AdresCrab.prototype.gemeenteChanged = function () {
        if (!this.data.gemeente) {
            this.data.straat = undefined;
            this.data.postcode = undefined;
            this.straatChanged();
        }
    };
    AdresCrab.prototype.straatChanged = function () {
        if (!this.data.straat) {
            this.data.huisnummer = undefined;
        }
    };
    AdresCrab.prototype.loadLanden = function () {
        var _this = this;
        this.crabService.getLanden().then(function (landen) {
            if (landen) {
                var firstOptions = [
                    { id: 'BE', naam: 'België' },
                    { id: 'DE', naam: 'Duitsland' },
                    { id: 'FR', naam: 'Frankrijk' },
                    { id: 'GB', naam: 'Groot-Brittanië' },
                    { id: 'NL', naam: 'Nederland' },
                    { id: 'LU', naam: 'Luxemburg' },
                    { naam: '─────────────────────────', disabled: true }
                ];
                _this.landen = firstOptions;
                landen.forEach(function (land) {
                    var exists = _this.landen.find(function (obj) { return obj.id === land.id; });
                    if (!exists) {
                        _this.landen.push(land);
                    }
                });
            }
        }).catch(function (error) {
            console.debug(error);
        });
    };
    AdresCrab.prototype.loadGemeenten = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.crabService.getGemeenten().then(function (gemeenten) {
                resolve(_this.suggestFilter(gemeenten, value));
            });
        });
    };
    AdresCrab.prototype.loadPostcodes = function (value) {
        var _this = this;
        var gemeente = this.data.gemeente ? this.data.gemeente.id : undefined;
        return new Promise(function (resolve) {
            if (gemeente) {
                _this.crabService.getPostcodes(gemeente).then(function (postcodes) {
                    postcodes.forEach(function (postcode) { postcode.naam = String(postcode.id); });
                    resolve(_this.suggestFilter(postcodes, value));
                });
            }
            else {
                _this.data.postcode = new locatie_1.Postcode(Number(value), value);
            }
        });
    };
    AdresCrab.prototype.loadStraten = function (value) {
        var _this = this;
        var gemeente = this.data.gemeente ? this.data.gemeente.id : undefined;
        return new Promise(function (resolve) {
            if (gemeente) {
                _this.crabService.getStraten(gemeente).then(function (straten) {
                    resolve(_this.suggestFilter(straten, value));
                });
            }
        });
    };
    AdresCrab.prototype.loadHuisnrs = function (value) {
        var _this = this;
        var straat = this.data.straat ? this.data.straat.id : undefined;
        return new Promise(function (resolve) {
            if (straat) {
                _this.crabService.getHuisnrs(straat).then(function (huisnrs) {
                    resolve(_this.suggestFilter(huisnrs, value));
                });
            }
        });
    };
    AdresCrab.prototype.suggestFilter = function (data, value) {
        return data.filter(function (obj) {
            return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], AdresCrab.prototype, "disabled", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", locatie_1.Adres)
    ], AdresCrab.prototype, "data", void 0);
    AdresCrab = __decorate([
        aurelia_framework_1.inject(aurelia_validation_1.ValidationController, aurelia_validation_1.ValidationControllerFactory, crab_api_service_1.CrabService, aurelia_framework_1.BindingEngine),
        __metadata("design:paramtypes", [aurelia_validation_1.ValidationController,
            aurelia_validation_1.ValidationControllerFactory,
            crab_api_service_1.CrabService,
            aurelia_framework_1.BindingEngine])
    ], AdresCrab);
    return AdresCrab;
}());
exports.AdresCrab = AdresCrab;

//# sourceMappingURL=adres-crab.js.map
