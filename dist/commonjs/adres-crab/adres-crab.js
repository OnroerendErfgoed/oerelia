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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_validation_1 = require("aurelia-validation");
var foundation_validation_renderer_1 = require("../foundation-validation-renderer/foundation-validation-renderer");
var adresregister_api_service_1 = require("../services/adresregister.api-service");
var autocomplete_type_1 = require("../autocomplete/models/autocomplete-type");
var lodash_1 = require("lodash");
var message_1 = require("../utilities/message/message");
var AdresCrab = (function () {
    function AdresCrab(controller, controllerFactory, adresregisterService, bindingEngine) {
        var _this = this;
        this.controller = controller;
        this.controllerFactory = controllerFactory;
        this.adresregisterService = adresregisterService;
        this.bindingEngine = bindingEngine;
        this.config = {
            postcode: { required: true, autocompleteType: autocomplete_type_1.autocompleteType.Auto },
            straat: { required: true, autocompleteType: autocomplete_type_1.autocompleteType.Auto },
            huisnummer: { required: true, autocompleteType: autocomplete_type_1.autocompleteType.Auto },
            busnummer: { required: false, autocompleteType: autocomplete_type_1.autocompleteType.Suggest }
        };
        this.copyAvailable = false;
        this.freeSearchAllowed = true;
        this.landen = [];
        this.vlaamseProvinciesNiscodes = ['10000', '70000', '40000', '20001', '30000'];
        this.suggest = {};
        this.controller = this.controllerFactory.createForCurrentScope();
        this.controller.addRenderer(new foundation_validation_renderer_1.FoundationValidationRenderer());
        this.loadLanden();
        this.suggest.gemeenten = { suggest: function (value) { return _this.loadGemeenten(value); } };
        this.suggest.postcodes = { suggest: function (value) { return _this.loadPostcodes(value); } };
        this.suggest.straten = { suggest: function (value) { return _this.loadStraten(value); } };
        this.suggest.huisnummers = { suggest: function (value) { return _this.loadHuisnrs(value); } };
        this.suggest.busnummers = { suggest: function (value) { return _this.loadBusnrs(value); } };
    }
    AdresCrab.prototype.bind = function () {
        var _this = this;
        this.data.adres = this.data.adres || { id: undefined, uri: undefined, huisnummer: undefined, busnummer: undefined };
        aurelia_validation_1.ValidationRules
            .ensure('land').required()
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .on(this.data);
        aurelia_validation_1.ValidationRules
            .ensure('huisnummer').required()
            .when(function () { return _this.config.huisnummer.required; })
            .on(this.data.adres);
        aurelia_validation_1.ValidationRules
            .ensure('gemeente').required()
            .ensure('postcode').required()
            .ensure('straat').required()
            .on(this);
        this.bindingEngine
            .propertyObserver(this.data, 'land')
            .subscribe(function (nv, ov) {
            _this.landChanged(nv, ov);
        });
        if (this.data.provincie && !this.vlaamseProvinciesNiscodes.includes(this.data.provincie.niscode)) {
            this.config.postcode.autocompleteType = autocomplete_type_1.autocompleteType.Suggest;
            this.config.straat.autocompleteType = autocomplete_type_1.autocompleteType.Suggest;
        }
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
        if (nv.code !== 'BE') {
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
        if (!this.vlaamseProvinciesNiscodes.includes(this.data.gemeente.provincie.niscode)) {
            this.config.postcode.autocompleteType = autocomplete_type_1.autocompleteType.Suggest;
            this.config.straat.autocompleteType = autocomplete_type_1.autocompleteType.Suggest;
        }
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
        return __awaiter(this, void 0, void 0, function () {
            var landen, staticLanden, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.adresregisterService.getLanden()];
                    case 1:
                        landen = _a.sent();
                        if (landen) {
                            staticLanden = [
                                { code: 'BE', naam: 'België' },
                                { code: 'DE', naam: 'Duitsland' },
                                { code: 'FR', naam: 'Frankrijk' },
                                { code: 'GB', naam: 'Groot-Brittanië' },
                                { code: 'NL', naam: 'Nederland' },
                                { code: 'LU', naam: 'Luxemburg' },
                                { code: 'divider', naam: '─────────────────────────' },
                            ];
                            this.landen = staticLanden;
                            landen.forEach(function (land) {
                                var exists = _this.landen.find(function (obj) { return obj.code === land.code; });
                                if (!exists) {
                                    _this.landen.push(land);
                                }
                            });
                        }
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        message_1.Message.error({
                            title: 'Er liep iets mis bij het ophalen van laden',
                            message: error_1.message
                        });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdresCrab.prototype.loadGemeenten = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var gemeenten, adresGemeenten, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.adresregisterService.getGemeenten()];
                    case 1:
                        gemeenten = _a.sent();
                        adresGemeenten = gemeenten.map(function (gemeente) { return ({
                            naam: gemeente.naam,
                            niscode: gemeente.niscode,
                            provincie: gemeente.provincie
                        }); });
                        return [2, this.suggestFilter(adresGemeenten, value)];
                    case 2:
                        error_2 = _a.sent();
                        message_1.Message.error({
                            title: 'Er liep iets mis bij het ophalen van gemeenten',
                            message: error_2.message,
                        });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AdresCrab.prototype.loadPostcodes = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var gemeente, postcodes, mappedPostcodes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gemeente = this.data.gemeente ? this.data.gemeente.naam : undefined;
                        if (!gemeente) {
                            this.data.postcode = undefined;
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getPostinfo(gemeente)];
                    case 2:
                        postcodes = _a.sent();
                        mappedPostcodes = postcodes.map(function (postcode) { return ({ nummer: postcode.postcode, uri: postcode.uri }); });
                        return [2, this.filterPostcodes(mappedPostcodes, value)];
                    case 3:
                        error_3 = _a.sent();
                        this.data.postcode = undefined;
                        message_1.Message.error({
                            title: 'Er liep iets mis bij het ophalen van postcodes',
                            message: error_3.message,
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    AdresCrab.prototype.loadStraten = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var niscode, straten, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        niscode = this.data.gemeente ? this.data.gemeente.niscode : undefined;
                        if (!niscode) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getStraten(niscode)];
                    case 2:
                        straten = _a.sent();
                        return [2, this.suggestFilter(straten, value)];
                    case 3:
                        error_4 = _a.sent();
                        message_1.Message.error({
                            title: 'Er liep iets mis bij het ophalen van straten',
                            message: error_4.message,
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    AdresCrab.prototype.loadHuisnrs = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var straat, huisnrs, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        straat = this.data.straat ? this.data.straat.id : undefined;
                        if (!straat) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getAdressen(straat)];
                    case 2:
                        huisnrs = _a.sent();
                        return [2, this.filterHuisnummers(huisnrs, value)];
                    case 3:
                        error_5 = _a.sent();
                        message_1.Message.error({
                            title: 'Er liep iets mis bij het ophalen van huisnummers',
                            message: error_5.message,
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    AdresCrab.prototype.loadBusnrs = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var straat, huisnummer, huisnrs, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        straat = this.data.straat ? this.data.straat.id : undefined;
                        huisnummer = this.data.adres ? this.data.adres.huisnummer : undefined;
                        if (!straat || !huisnummer) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getAdressen(straat, huisnummer)];
                    case 2:
                        huisnrs = _a.sent();
                        return [2, this.filterBusnummers(huisnrs, value)];
                    case 3:
                        error_6 = _a.sent();
                        message_1.Message.error({
                            title: 'Er liep iets mis bij het ophalen van busnummers',
                            message: error_6.message,
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    AdresCrab.prototype.suggestFilter = function (data, value) {
        return data.filter(function (obj) {
            return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    };
    AdresCrab.prototype.filterPostcodes = function (postcodes, searchPostcode) {
        return postcodes.filter(function (postcode) { return postcode.nummer.includes(searchPostcode); });
    };
    AdresCrab.prototype.filterHuisnummers = function (adressen, searchHuisnummer) {
        return lodash_1.uniqBy(lodash_1.sortBy(adressen.filter(function (adres) { return adres.huisnummer.includes(searchHuisnummer); })), 'huisnummer');
    };
    AdresCrab.prototype.filterBusnummers = function (adressen, searchBusnummer) {
        return adressen.filter(function (adres) { return adres.busnummer.includes(searchBusnummer); });
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], AdresCrab.prototype, "disabled", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "data", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "config", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "copiedAdres", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "copyAvailable", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AdresCrab.prototype, "freeSearchAllowed", void 0);
    AdresCrab = __decorate([
        aurelia_framework_1.inject(aurelia_validation_1.ValidationController, aurelia_validation_1.ValidationControllerFactory, adresregister_api_service_1.AdresregisterService, aurelia_framework_1.BindingEngine),
        __metadata("design:paramtypes", [aurelia_validation_1.ValidationController,
            aurelia_validation_1.ValidationControllerFactory,
            adresregister_api_service_1.AdresregisterService,
            aurelia_framework_1.BindingEngine])
    ], AdresCrab);
    return AdresCrab;
}());
exports.AdresCrab = AdresCrab;

//# sourceMappingURL=adres-crab.js.map
