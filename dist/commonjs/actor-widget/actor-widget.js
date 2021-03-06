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
var crab_api_service_1 = require("../services/crab.api-service");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_dialog_1 = require("aurelia-dialog");
var ActorWidget = (function () {
    function ActorWidget(crabService) {
        var _this = this;
        this.crabService = crabService;
        this.showSpinner = true;
        this.showTable = true;
        this.showActor = false;
        this.showFilters = false;
        this.isAdvancedSearch = false;
        this.landen = [];
        this.gemeenten = [];
        this.postcodes = [];
        this.straten = [];
        this.huisnrs = [];
        this.suggest = {};
        this.filters = {};
        this.loadLanden();
        this.suggest.gemeenten = { suggest: function (value) { return _this.loadGemeenten(value); } };
        this.suggest.postcode = { suggest: function (value) { return _this.loadPostcodes(value); } };
        this.suggest.straten = { suggest: function (value) { return _this.loadStraten(value); } };
        this.suggest.huisnummer = { suggest: function (value) { return _this.loadHuisnrs(value); } };
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
        this.gridOptions.overlayLoadingTemplate = '<i class="fa fa-pulse fa-spinner"></i>';
        this.gridOptions.columnDefs = [
            { headerName: '#', field: 'id', sort: 'desc', width: 50 },
            { headerName: 'Naam', field: 'naam', width: 200 },
            { headerName: 'Voornaam', field: 'voornaam', width: 200 },
            { headerName: 'Type', field: 'type.naam', width: 200 },
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
                        gemeente: f.gemeente && f.gemeente !== null ? f.gemeente.id : undefined,
                        postcode: f.postcode && f.postcode !== null ? f.postcode.id : f.post_code || undefined,
                        straat: f.straat && f.straat != null ? f.straat.id : undefined,
                        straat_naam: f.straat_naam ? f.straat_naam : undefined,
                        huisnummer: f.huisnummer && f.huisnummer !== null ? f.huisnummer.id : undefined,
                        huisnummer_label: f.huisnummer_label ? f.huisnummer_label : undefined,
                        subadres: f.subadres ? f.subadres : undefined,
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
        console.debug('actor-widget::onGridSizeChanged');
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
        this.selectedActor = params.data;
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
        this.dialogController.ok({ 'scope': this.scope, 'actor': this.selectedActor });
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
    ActorWidget.prototype.loadLanden = function () {
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
    ActorWidget.prototype.loadGemeenten = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.crabService.getGemeenten().then(function (gemeenten) {
                if (gemeenten) {
                    var result = gemeenten.filter(function (obj) { return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1; });
                    resolve(result);
                }
            });
        });
    };
    ActorWidget.prototype.loadPostcodes = function (value) {
        var _this = this;
        var gemeente = this.filters.gemeente ? this.filters.gemeente.id : undefined;
        return new Promise(function (resolve) {
            if (gemeente) {
                _this.crabService.getPostcodes(gemeente).then(function (postcodes) {
                    postcodes.forEach(function (postcode) {
                        postcode.naam = String(postcode.id);
                    });
                    var result = postcodes.filter(function (obj) { return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1; });
                    resolve(result);
                });
            }
            else {
                _this.filters.post_code = value;
            }
        });
    };
    ActorWidget.prototype.loadStraten = function (value) {
        var _this = this;
        var gemeente = this.filters.gemeente ? this.filters.gemeente.id : undefined;
        return new Promise(function (resolve) {
            if (gemeente) {
                _this.crabService.getStraten(gemeente).then(function (straten) {
                    var result = straten.filter(function (obj) { return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1; });
                    _this.filters.straat_naam = undefined;
                    resolve(result);
                });
            }
            else {
                _this.filters.straat_naam = value;
            }
        });
    };
    ActorWidget.prototype.loadHuisnrs = function (value) {
        var _this = this;
        var straat = this.filters.straat ? this.filters.straat.id : undefined;
        return new Promise(function (resolve) {
            if (straat) {
                _this.crabService.getHuisnrs(straat).then(function (huisnrs) {
                    var result = huisnrs.filter(function (obj) { return obj.naam.toLowerCase().indexOf(value.toLowerCase()) !== -1; });
                    _this.filters.huisnummer_label = undefined;
                    resolve(result);
                });
            }
            else {
                _this.filters.huisnummer_label = value;
            }
        });
    };
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", Object)
    ], ActorWidget.prototype, "scope", void 0);
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", Object)
    ], ActorWidget.prototype, "actorenApiService", void 0);
    __decorate([
        aurelia_templating_1.bindable,
        __metadata("design:type", aurelia_dialog_1.DialogController)
    ], ActorWidget.prototype, "dialogController", void 0);
    ActorWidget = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [crab_api_service_1.CrabService])
    ], ActorWidget);
    return ActorWidget;
}());
exports.ActorWidget = ActorWidget;

//# sourceMappingURL=actor-widget.js.map
