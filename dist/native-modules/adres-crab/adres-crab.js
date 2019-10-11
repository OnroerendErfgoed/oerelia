var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { FoundationValidationRenderer } from '../foundation-validation-renderer/foundation-validation-renderer';
import { Adres, Postcode } from './models/locatie';
import { CrabService } from '../services/crab.api-service';
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
        this.controller.addRenderer(new FoundationValidationRenderer());
        this.loadLanden();
        this.suggest.gemeenten = { suggest: function (value) { return _this.loadGemeenten(value); } };
        this.suggest.postcodes = { suggest: function (value) { return _this.loadPostcodes(value); } };
        this.suggest.straten = { suggest: function (value) { return _this.loadStraten(value); } };
        this.suggest.huisnummers = { suggest: function (value) { return _this.loadHuisnrs(value); } };
    }
    AdresCrab.prototype.bind = function () {
        var _this = this;
        ValidationRules
            .ensure('land').required()
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .ensure('huisnummer').required()
            .on(this.data);
        ValidationRules
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
                _this.data.postcode = new Postcode(Number(value), value);
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
        bindable,
        __metadata("design:type", Boolean)
    ], AdresCrab.prototype, "disabled", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Adres)
    ], AdresCrab.prototype, "data", void 0);
    AdresCrab = __decorate([
        inject(ValidationController, ValidationControllerFactory, CrabService, BindingEngine),
        __metadata("design:paramtypes", [ValidationController,
            ValidationControllerFactory,
            CrabService,
            BindingEngine])
    ], AdresCrab);
    return AdresCrab;
}());
export { AdresCrab };
