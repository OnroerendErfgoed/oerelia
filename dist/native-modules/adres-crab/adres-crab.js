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
import { AdresregisterService } from '../services/adresregister.api-service';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { sortBy, uniqBy } from 'lodash';
var AdresCrab = (function () {
    function AdresCrab(controller, controllerFactory, adresregisterService, bindingEngine) {
        var _this = this;
        this.controller = controller;
        this.controllerFactory = controllerFactory;
        this.adresregisterService = adresregisterService;
        this.bindingEngine = bindingEngine;
        this.config = {
            huisnummer: { required: true, autocompleteType: autocompleteType.Auto }
        };
        this.copyAvailable = false;
        this.landen = [];
        this.suggest = {};
        this.controller = this.controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new FoundationValidationRenderer());
        this.loadLanden();
        this.suggest.gemeenten = { suggest: function (value) { return _this.loadGemeenten(value); } };
        this.suggest.postcodes = { suggest: function (value) { return _this.loadPostcodes(value); } };
        this.suggest.straten = { suggest: function (value) { return _this.loadStraten(value); } };
        this.suggest.huisnummers = { suggest: function (value) { return _this.loadHuisnrs(value); } };
        this.suggest.busnummers = { suggest: function (value) { return _this.loadBusnrs(value); } };
    }
    AdresCrab.prototype.bind = function () {
        var _this = this;
        this.data.adres = { id: undefined, uri: undefined, huisnummer: undefined, busnummer: undefined };
        ValidationRules
            .ensure('land').required()
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .on(this.data);
        ValidationRules
            .ensure('huisnummer').required()
            .when(function () { return _this.config.huisnummer.required; })
            .on(this.data.adres);
        ValidationRules
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .on(this);
        this.bindingEngine
            .propertyObserver(this.data, 'land')
            .subscribe(function (nv, ov) {
            _this.landChanged(nv, ov);
        });
        this.data.land = this.data.land || { code: 'BE', naam: 'België' };
        if (this.data.land.code !== 'BE') {
            this.gemeente = this.data.gemeente ? { naam: this.data.gemeente.naam, niscode: this.data.gemeente.niscode } : undefined;
            this.postcode = this.data.postcode ? { nummer: this.data.postcode.nummer, uri: this.data.postcode.uri } : undefined;
            this.straat = this.data.straat ? { id: this.data.straat.id, naam: this.data.straat.naam, omschrijving: this.data.straat.omschrijving, uri: this.data.straat.uri }
                : undefined;
            this.adres = this.data.adres ? { id: this.data.adres.id, uri: this.data.adres.uri, busnummer: this.data.adres.busnummer, huisnummer: this.data.adres.huisnummer }
                : undefined;
        }
    };
    AdresCrab.prototype.parseField = function (value, property) {
        this.data[property] = { naam: value };
    };
    AdresCrab.prototype.landChanged = function (nv, ov) {
        if (nv.code === 'BE' || ov.code === 'BE') {
            this.gemeente = undefined;
            this.straat = undefined;
            this.postcode = undefined;
            this.adres = undefined;
            this.data.gemeente = undefined;
            this.data.straat = undefined;
            this.data.postcode = undefined;
            this.data.adres = undefined;
        }
    };
    AdresCrab.prototype.gemeenteChanged = function () {
        if (!this.data.gemeente) {
            this.data.straat = undefined;
            this.data.postcode = undefined;
            this.data.adres = undefined;
            this.straatChanged();
        }
    };
    AdresCrab.prototype.straatChanged = function () {
        if (!this.data.straat) {
            this.data.adres = undefined;
        }
    };
    AdresCrab.prototype.copyAdres = function () {
        this.copiedAdres = this.data;
    };
    AdresCrab.prototype.pasteAdres = function () {
        this.data.land = this.copiedAdres.land;
        this.data.gemeente = this.copiedAdres.gemeente;
        this.data.postcode = this.copiedAdres.postcode;
        this.data.straat = this.copiedAdres.straat;
        this.data.adres = this.copiedAdres.adres;
    };
    AdresCrab.prototype.loadLanden = function () {
        var _this = this;
        this.adresregisterService.getLanden().then(function (landen) {
            if (landen) {
                var staticLanden = [
                    { code: 'BE', naam: 'België' },
                    { code: 'DE', naam: 'Duitsland' },
                    { code: 'FR', naam: 'Frankrijk' },
                    { code: 'GB', naam: 'Groot-Brittanië' },
                    { code: 'NL', naam: 'Nederland' },
                    { code: 'LU', naam: 'Luxemburg' },
                    { code: 'divider', naam: '─────────────────────────' },
                ];
                _this.landen = staticLanden;
                landen.forEach(function (land) {
                    var exists = _this.landen.find(function (obj) { return obj.code === land.code; });
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
            _this.adresregisterService.getGemeenten().then(function (gemeenten) {
                resolve(_this.suggestFilter(gemeenten, value));
            });
        });
    };
    AdresCrab.prototype.loadPostcodes = function (value) {
        var _this = this;
        var gemeente = this.data.gemeente ? this.data.gemeente.naam : undefined;
        return new Promise(function (resolve) {
            if (gemeente) {
                _this.adresregisterService.getPostinfo(gemeente).then(function (postcodes) {
                    resolve(_this.filterPostcodes(postcodes, value));
                });
            }
            else {
                _this.data.postcode = undefined;
            }
        });
    };
    AdresCrab.prototype.loadStraten = function (value) {
        var _this = this;
        var niscode = this.data.gemeente ? this.data.gemeente.niscode : undefined;
        return new Promise(function (resolve) {
            if (niscode) {
                _this.adresregisterService.getStraten(niscode).then(function (straten) {
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
                _this.adresregisterService.getAdressen(straat).then(function (huisnrs) {
                    resolve(_this.filterHuisnummers(huisnrs, value));
                });
            }
        });
    };
    AdresCrab.prototype.loadBusnrs = function (value) {
        var _this = this;
        var straat = this.data.straat ? this.data.straat.id : undefined;
        var huisnummer = this.data.adres ? this.data.adres.huisnummer : undefined;
        return new Promise(function (resolve) {
            if (straat && huisnummer) {
                _this.adresregisterService.getAdressen(straat, huisnummer).then(function (huisnrs) {
                    resolve(_this.filterBusnummers(huisnrs, value));
                });
            }
        });
    };
    AdresCrab.prototype.suggestFilter = function (data, value) {
        return data.filter(function (obj) {
            return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    };
    AdresCrab.prototype.filterPostcodes = function (postcodes, searchPostcode) {
        return postcodes.filter(function (postcode) { return postcode.postcode.includes(searchPostcode); });
    };
    AdresCrab.prototype.filterHuisnummers = function (adressen, searchHuisnummer) {
        return uniqBy(sortBy(adressen.filter(function (adres) { return adres.huisnummer.includes(searchHuisnummer); })), 'huisnummer');
    };
    AdresCrab.prototype.filterBusnummers = function (adressen, searchBusnummer) {
        return adressen.filter(function (adres) { return adres.busnummer.includes(searchBusnummer); });
    };
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], AdresCrab.prototype, "disabled", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "data", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "config", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "copiedAdres", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "copyAvailable", void 0);
    AdresCrab = __decorate([
        inject(ValidationController, ValidationControllerFactory, AdresregisterService, BindingEngine),
        __metadata("design:paramtypes", [ValidationController,
            ValidationControllerFactory,
            AdresregisterService,
            BindingEngine])
    ], AdresCrab);
    return AdresCrab;
}());
export { AdresCrab };

//# sourceMappingURL=adres-crab.js.map
