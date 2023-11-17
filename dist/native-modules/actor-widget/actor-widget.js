var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { autoinject } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';
import { DialogController } from 'aurelia-dialog';
import { uniqBy } from 'lodash';
import { autocompleteType } from '../autocomplete/models/autocomplete-type';
import { AdresregisterService } from '../services/adresregister.api-service';
import { Message } from '../utilities/message/message';
var ActorWidget = (function () {
    function ActorWidget(adresregisterService) {
        var _this = this;
        this.adresregisterService = adresregisterService;
        this.getActorOnRowClick = false;
        this.showSpinner = true;
        this.showTable = true;
        this.showActor = false;
        this.showFilters = false;
        this.isAdvancedSearch = false;
        this.landen = [];
        this.gemeenten = [];
        this.postcodes = [];
        this.straten = [];
        this.suggest = {};
        this.adresCrabConfig = {
            postcode: { required: true, autocompleteType: autocompleteType.Auto },
            straat: { required: true, autocompleteType: autocompleteType.Auto },
            huisnummer: { required: true, autocompleteType: autocompleteType.Suggest },
            busnummer: { required: false, autocompleteType: autocompleteType.Suggest }
        };
        this.filters = {};
        this.vrijAdres = false;
        this.vlaamseProvinciesNiscodes = ['10000', '70000', '40000', '20001', '30000'];
        this.loadLanden();
        this.suggest.gemeenten = { suggest: function (value) { return _this.loadGemeenten(value); } };
        this.suggest.postcodes = { suggest: function (value) { return _this.loadPostcodes(value); } };
        this.suggest.straten = { suggest: function (value) { return _this.loadStraten(value); } };
        this.suggest.huisnummers = { suggest: function (value) { return _this.loadHuisnrs(value); } };
        this.suggest.busnummers = { suggest: function (value) { return _this.loadBusnrs(value); } };
    }
    ActorWidget.prototype.bind = function () {
        this.gridOptions = {};
        this.gridOptions.context = this;
        this.gridOptions.suppressMovableColumns = true;
        this.gridOptions.suppressClickEdit = true;
        this.gridOptions.defaultColDef = {
            editable: false,
            sortable: true,
            resizable: true
        };
        this.gridOptions.headerHeight = 30;
        this.gridOptions.rowHeight = 25;
        this.gridOptions.rowModelType = 'infinite';
        this.gridOptions.rowData = null;
        this.gridOptions.infiniteInitialRowCount = 1;
        this.gridOptions.cacheBlockSize = 50;
        this.gridOptions.overlayNoRowsTemplate = '<span class="no-rows">Er zijn geen resultaten</span>';
        this.gridOptions.overlayLoadingTemplate = '<i class="fa fa-pulse fa-spinner"></i>';
        this.gridOptions.columnDefs = [
            { headerName: '#', field: 'id', sort: 'desc', width: 50 },
            { headerName: 'Naam', field: 'naam', width: 200 },
            { headerName: 'Voornaam', field: 'voornaam', width: 200 },
            { headerName: 'Type', field: 'type.naam', width: 200, sortable: false },
            { headerName: 'Acties', width: 55, cellClass: 'acties-cell',
                cellRenderer: this.actiesCellRenderer, sortable: false
            }
        ];
    };
    ActorWidget.prototype.setRowData = function () {
        var dataSource = {
            rowCount: null,
            getRows: function (params) {
                params.context.showSpinner = true;
                var paramsObj = {};
                if (params.context.isAdvancedSearch) {
                    var f = params.context.filters;
                    paramsObj = {
                        naam: f.naam ? f.naam : undefined,
                        voornaam: f.voornaam ? f.voornaam : undefined,
                        email: f.email ? f.email : undefined,
                        telefoon: f.telefoon ? f.telefoon : undefined,
                        type: f.type ? f.type : undefined,
                        land: f.land ? f.land : undefined,
                        gemeente: f.gemeente && f.gemeente !== null ? f.gemeente.naam : undefined,
                        postcode: f.postcode && f.postcode !== null ? f.postcode.nummer : f.post_code || undefined,
                        straat: f.straat && f.straat != null ? f.straat.id || f.straat.naam : undefined,
                        huisnummer: f.adres && f.adres.huisnummer ? f.adres.huisnummer : undefined,
                        busnummer: f.adres && f.adres.busnummer ? f.adres.busnummer : undefined,
                        persid: f.persid ? f.persid : undefined,
                        rrn: f.rrn ? f.rrn : undefined,
                        kbo: f.kbo ? f.kbo : undefined
                    };
                }
                else {
                    var query = params.context.zoekterm || null;
                    var sort = '+';
                    if (params.sortModel.length) {
                        var sortModel = params.sortModel[0];
                        sort = ((sortModel.sort === 'asc') ? '' : '-') + sortModel.colId;
                    }
                    paramsObj = {
                        omschrijving: query ? query + '*' : null,
                        sort: sort
                    };
                }
                params.context.actorenApiService.getActoren(params.startRow, params.endRow, paramsObj)
                    .then(function (data) {
                    if (data) {
                        params.successCallback(data.content, data.lastRow);
                        params.context.zoekterm = '';
                        if (data.content.length <= 0) {
                            params.context.gridOptions.api.showNoRowsOverlay();
                            params.context.gridOptions.api.setInfiniteRowCount(0, false);
                        }
                        else {
                            params.context.gridOptions.api.hideOverlay();
                        }
                    }
                    params.context.onGridSizeChanged();
                    params.context.showSpinner = false;
                });
            }
        };
        this.gridOptions.api.setDatasource(dataSource);
    };
    ActorWidget.prototype.keydown = function (e) {
        var key = e.which;
        if (key === 13) {
            e.preventDefault();
            this.search();
        }
        return true;
    };
    ActorWidget.prototype.onGridReady = function () {
        this.setRowData();
    };
    ActorWidget.prototype.onGridSizeChanged = function () {
        if (this.gridOptions.api) {
            this.gridOptions.api.sizeColumnsToFit();
        }
    };
    ActorWidget.prototype.search = function () {
        this.gridOptions.api.purgeInfiniteCache();
    };
    ActorWidget.prototype.refresh = function () {
        this.gridOptions.api.clearFocusedCell();
        this.selectedActor = undefined;
        this.isAdvancedSearch = false;
        this.setRowData();
    };
    ActorWidget.prototype.advancedSearch = function () {
        this.isAdvancedSearch = true;
        this.showFilters = false;
        this.showTable = true;
    };
    ActorWidget.prototype.clearFilters = function () {
        this.filters = {};
        this.refresh();
    };
    ActorWidget.prototype.toggleFilters = function (activate) {
        this.showTable = !activate;
        this.showActor = false;
        this.showFilters = activate;
    };
    ActorWidget.prototype.selectActor = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var data, primairAdres;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedActor = params.data;
                        if (!this.getActorOnRowClick) return [3, 2];
                        this.showSpinner = true;
                        return [4, this.actorenApiService.getActorById(params.data.id)];
                    case 1:
                        data = _a.sent();
                        this.showSpinner = false;
                        if (data) {
                            this.selectedActor = data;
                            primairAdres = data.adressen.filter(function (obj) {
                                return obj.adrestype.id === 1;
                            })[0];
                            this.adresId = primairAdres ? primairAdres.id : null;
                        }
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    ActorWidget.prototype.toggleActorDetail = function (activate, params) {
        var _this = this;
        if (activate) {
            this.showSpinner = true;
            this.actorenApiService.getActorById(params.data.id)
                .then(function (data) {
                _this.showSpinner = false;
                if (data) {
                    _this.selectedActor = data;
                    _this.showTable = !activate;
                    _this.showActor = activate;
                }
            });
        }
        else {
            this.showTable = !activate;
            this.showActor = activate;
        }
    };
    ActorWidget.prototype.toevoegen = function () {
        this.dialogController.ok(__assign({ 'scope': this.scope, 'actor': this.selectedActor }, (this.getActorOnRowClick ? { 'adresId': this.adresId } : {})));
    };
    ActorWidget.prototype.annuleren = function () {
        this.dialogController.cancel();
    };
    ActorWidget.prototype.actiesCellRenderer = function (params) {
        if (params.data) {
            var container = document.createElement('div');
            var open_1 = document.createElement('i');
            open_1.className = 'fa fa-eye';
            open_1.title = 'Details van de actor bekijken';
            open_1.addEventListener('click', function () { return params.context.toggleActorDetail(true, params); });
            container.appendChild(open_1);
            var edit = document.createElement('a');
            edit.className = 'fa fa-pencil';
            edit.setAttribute('title', 'Actor editeren');
            edit.href = params.context.actorenApiService.config.actorenUrl + "/beheer#/actoren/" + params.data.id;
            edit.target = '_blank';
            container.appendChild(edit);
            return container;
        }
    };
    ActorWidget.prototype.landChanged = function () {
        this.filters.gemeente = undefined;
        this.gemeenteChanged();
    };
    ActorWidget.prototype.gemeenteChanged = function () {
        if (this.filters.gemeente &&
            this.filters.gemeente.provincie &&
            !this.isVlaamseProvincie(this.filters.gemeente.provincie)) {
            this.adresCrabConfig.postcode.autocompleteType = autocompleteType.Suggest;
            this.adresCrabConfig.straat.autocompleteType = autocompleteType.Suggest;
        }
        else {
            this.adresCrabConfig.postcode.autocompleteType = autocompleteType.Auto;
            this.adresCrabConfig.straat.autocompleteType = autocompleteType.Auto;
        }
        this.filters.straat = undefined;
        this.filters.postcode = undefined;
        this.straatChanged();
    };
    ActorWidget.prototype.straatChanged = function () {
        this.filters.adres = undefined;
    };
    ActorWidget.prototype.loadLanden = function () {
        return __awaiter(this, void 0, void 0, function () {
            var landen, firstOptions, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.adresregisterService.getLanden()];
                    case 1:
                        landen = _a.sent();
                        if (landen) {
                            firstOptions = [
                                { code: 'BE', naam: 'België' },
                                { code: 'DE', naam: 'Duitsland' },
                                { code: 'FR', naam: 'Frankrijk' },
                                { code: 'GB', naam: 'Groot-Brittanië' },
                                { code: 'NL', naam: 'Nederland' },
                                { code: 'LU', naam: 'Luxemburg' },
                                { code: 'divider', naam: '─────────────────────────' }
                            ];
                            this.landen = firstOptions;
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
                        Message.error({
                            title: 'Er liep iets mis bij het ophalen van landen',
                            message: error_1.message
                        });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ActorWidget.prototype.loadGemeenten = function (value) {
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
                        Message.error({
                            title: 'Er liep iets mis bij het ophalen van gemeenten',
                            message: error_2.message
                        });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ActorWidget.prototype.loadPostcodes = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var gemeente, postcodes, mappedPostcodes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gemeente = this.filters.gemeente ? this.filters.gemeente.naam : undefined;
                        if (!gemeente) return [3, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getPostinfo(gemeente)];
                    case 2:
                        postcodes = _a.sent();
                        mappedPostcodes = postcodes.map(function (postcode) {
                            return ({ nummer: postcode.postcode, uri: postcode.uri });
                        });
                        return [2, this.filterPostcodes(mappedPostcodes, value)];
                    case 3:
                        error_3 = _a.sent();
                        this.filters.postcode = undefined;
                        Message.error({
                            title: 'Er liep iets mis bij het ophalen van postcodes',
                            message: error_3.message
                        });
                        return [3, 4];
                    case 4: return [3, 6];
                    case 5:
                        this.filters.post_code = value;
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    ActorWidget.prototype.loadStraten = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var gemeenteNiscode, postcodeUri, straten, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gemeenteNiscode = this.filters.gemeente ? this.filters.gemeente.niscode : undefined;
                        postcodeUri = this.filters.postcode ? this.filters.postcode.uri : undefined;
                        if (!gemeenteNiscode || !postcodeUri) {
                            this.vrijAdres = true;
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getStraten(gemeenteNiscode)];
                    case 2:
                        straten = _a.sent();
                        return [2, this.suggestFilter(straten, value)];
                    case 3:
                        error_4 = _a.sent();
                        Message.error({
                            title: 'Er liep iets mis bij het ophalen van straten',
                            message: error_4.message
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    ActorWidget.prototype.loadHuisnrs = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var straatId, huisnrs, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        straatId = this.filters.straat ? this.filters.straat.id : undefined;
                        if (this.vrijAdres ||
                            (this.filters.gemeente.provincie && !this.isVlaamseProvincie(this.filters.gemeente.provincie)) ||
                            !straatId) {
                            this.vrijAdres = true;
                            return [2];
                        }
                        this.vrijAdres = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getAdressen(straatId)];
                    case 2:
                        huisnrs = _a.sent();
                        return [2, this.filterHuisnummers(huisnrs, value)];
                    case 3:
                        error_5 = _a.sent();
                        Message.error({
                            title: 'Er liep iets mis bij het ophalen van huisnummers',
                            message: error_5.message
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    ActorWidget.prototype.loadBusnrs = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var straatId, huisnummer, huisnrs, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        straatId = this.filters.straat ? this.filters.straat.id : undefined;
                        huisnummer = this.filters.adres ? this.filters.adres.huisnummer : undefined;
                        if (!this.filters.adres.id || !huisnummer || this.vrijAdres) {
                            return [2];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.adresregisterService.getAdressen(straatId, huisnummer)];
                    case 2:
                        huisnrs = _a.sent();
                        return [2, this.filterBusnummers(huisnrs, value)];
                    case 3:
                        error_6 = _a.sent();
                        Message.error({
                            title: 'Er liep iets mis bij het ophalen van busnummers',
                            message: error_6.message
                        });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    ActorWidget.prototype.suggestFilter = function (data, value) {
        return data.filter(function (obj) {
            return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    };
    ActorWidget.prototype.filterPostcodes = function (postcodes, searchPostcode) {
        return postcodes.filter(function (postcode) { return postcode.nummer.includes(searchPostcode); });
    };
    ActorWidget.prototype.isVlaamseProvincie = function (provincie) {
        return this.vlaamseProvinciesNiscodes.includes(provincie.niscode);
    };
    ActorWidget.prototype.filterHuisnummers = function (adressen, searchHuisnummer) {
        var adresList = uniqBy(adressen
            .filter(function (adres) { return adres.huisnummer
            .includes(searchHuisnummer); }), 'huisnummer');
        return adresList.sort(function (a, b) { return a.huisnummer.localeCompare(b.huisnummer, 'en', { numeric: true }); });
    };
    ActorWidget.prototype.filterBusnummers = function (adressen, searchBusnummer) {
        return adressen.filter(function (adres) { return adres.busnummer
            .includes(searchBusnummer); })
            .sort(function (a, b) { return a.busnummer.localeCompare(b.busnummer, 'en', { numeric: true }); });
    };
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], ActorWidget.prototype, "scope", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], ActorWidget.prototype, "actorenApiService", void 0);
    __decorate([
        bindable,
        __metadata("design:type", DialogController)
    ], ActorWidget.prototype, "dialogController", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], ActorWidget.prototype, "getActorOnRowClick", void 0);
    ActorWidget = __decorate([
        autoinject,
        __metadata("design:paramtypes", [AdresregisterService])
    ], ActorWidget);
    return ActorWidget;
}());
export { ActorWidget };

//# sourceMappingURL=actor-widget.js.map
