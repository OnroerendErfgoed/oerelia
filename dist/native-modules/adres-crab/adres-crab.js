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
var AdresCrab = (function () {
    function AdresCrab(controller, controllerFactory, adresregisterService, bindingEngine) {
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
    }
    AdresCrab.prototype.bind = function () {
        var _this = this;
        ValidationRules
            .ensure('land').required()
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .ensure('huisnummer')
            .required()
            .when(function () { return _this.config.huisnummer.required; })
            .on(this.data);
        ValidationRules
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .ensure('huisnummer')
            .required()
            .when(function () { return _this.config.huisnummer.required; })
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
    AdresCrab.prototype.huisnummerParser = function (value) {
        return value;
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
