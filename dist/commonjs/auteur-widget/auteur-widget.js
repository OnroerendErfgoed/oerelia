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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.AuteurWidget = void 0;
var aurelia_dialog_1 = require("aurelia-dialog");
var aurelia_framework_1 = require("aurelia-framework");
var log = aurelia_framework_1.LogManager.getLogger('auteur-widget');
var AuteurWidget = (function () {
    function AuteurWidget(dialogService, controller) {
        this.dialogService = dialogService;
        this.controller = controller;
        this.isEigenaarVermogensrecht = false;
        this.isBeheerder = false;
        this.auteurRelaties = [];
        this.single = false;
        this.collegas = false;
        this.gridOptions = {};
        this.buttonActief = false;
        this.validAuteurRelaties = [];
    }
    AuteurWidget.prototype.bind = function () {
        var _this = this;
        this.validAuteurRelaties = this.filterValidRelaties(this.auteurRelaties);
        var mailSubject = 'Nieuwe auteur toevoegen';
        var mailBody = "Beste,\n\n" +
            "Gelieve een auteur toe te voegen aan de auteursdatabank met volgende gegevens:\n\n" +
            "Indien de auteur een natuurlijk persoon is:\n" +
            "Naam (verplicht):\n" +
            "Voornaam (verplicht):\n" +
            "e-mail:\n" +
            "Mag het e-mailadres publiek zichtbaar zijn in de toepassing?:\n" +
            "Orcid:\n" +
            "Bedrijf waarvoor auteur werkt:\n\n" +
            "Indien de auteur een organisatie is:\n" +
            "Naam (verplicht):\n" +
            "KBO (verplicht):\n" +
            "e-mail:\n" +
            "Mag het e-mailadres publiek zichtbaar zijn in de toepassing?:";
        this.mailLink = "mailto:auteurs@onroerenderfgoed.be?subject=".concat(encodeURIComponent(mailSubject), "&body=").concat(encodeURIComponent(mailBody));
        this.gridOptions.context = this;
        this.gridOptions.suppressMovableColumns = true;
        this.gridOptions.defaultColDef = {
            resizable: true,
            sortable: true,
        };
        this.gridOptions.headerHeight = 45;
        this.gridOptions.rowHeight = 40;
        this.gridOptions.rowModelType = 'infinite';
        this.gridOptions.rowData = null;
        this.gridOptions.infiniteInitialRowCount = 1;
        this.gridOptions.cacheBlockSize = 50;
        this.gridOptions.domLayout = 'autoHeight';
        this.gridOptions.overlayNoRowsTemplate = '<span class="no-rows">Er zijn geen resultaten</span>';
        this.gridOptions.overlayLoadingTemplate = '<i class="fa fa-pulse fa-spinner"></i>';
        this.gridOptions.enableBrowserTooltips = true;
        this.gridOptions.columnDefs = this.getColumnDefinitions();
        this.gridOptions.rowSelection = this.single ? 'single' : 'multiple';
        this.gridOptions.onRowSelected = function () { return _this.buttonActief = _this.isAnyRowSelected(); };
    };
    AuteurWidget.prototype.setRowData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataSource;
            var _this = this;
            return __generator(this, function (_a) {
                dataSource = {
                    rowCount: null,
                    getRows: function (params) { return __awaiter(_this, void 0, void 0, function () {
                        var sortParameters, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    sortParameters = this.setParameters(params);
                                    params.context.gridOptions.api.showLoadingOverlay();
                                    return [4, params.context.service.getAll(sortParameters, { start: params.startRow, end: params.endRow })
                                            .catch(function (e) { return log.error(e); })];
                                case 1:
                                    data = _a.sent();
                                    if (data) {
                                        params.successCallback(data.content, data.lastRow);
                                        if (data.content.length <= 0) {
                                            params.context.gridOptions.api.showNoRowsOverlay();
                                            params.context.gridOptions.api.setInfiniteRowCount(0, false);
                                        }
                                        else {
                                            params.context.gridOptions.api.hideOverlay();
                                        }
                                    }
                                    else {
                                        params.context.gridOptions.api.showNoRowsOverlay();
                                    }
                                    params.context.resize();
                                    return [2];
                            }
                        });
                    }); }
                };
                this.gridOptions.api.setDatasource(dataSource);
                return [2];
            });
        });
    };
    AuteurWidget.prototype.onGridReady = function () {
        this.setRowData();
    };
    AuteurWidget.prototype.resize = function () {
        this.gridOptions.api.sizeColumnsToFit();
        this.gridOptions.api.resetRowHeights();
        this.gridOptions.api.sizeColumnsToFit();
    };
    AuteurWidget.prototype.refresh = function () {
        this.gridOptions.api.refreshInfiniteCache();
    };
    AuteurWidget.prototype.search = function () {
        this.gridOptions.api.purgeInfiniteCache();
    };
    AuteurWidget.prototype.addAuteur = function () {
        if (!this.buttonActief) {
            return;
        }
        var selectedAuteurs = this.gridOptions.api.getSelectedRows();
        this.controller.ok(this.single ? selectedAuteurs[0] : selectedAuteurs);
    };
    AuteurWidget.prototype.getColumnDefinitions = function () {
        return [
            {
                headerName: '',
                field: 'select',
                checkboxSelection: true,
                headerCheckboxSelection: true,
                width: 10,
            },
            { headerName: 'ID', field: 'id', sort: 'desc', width: 50 },
            { headerName: 'Naam', colId: 'naam', field: 'omschrijving', width: 150 },
            { headerName: 'Identificatie', colId: 'identificatie', field: 'identificatie', width: 150 },
            { headerName: 'Huidige relaties', field: 'relaties', sortable: false,
                cellRenderer: this.huidigeRelatiesCellRenderer, flex: 1 },
            { headerName: '', cellClass: 'acties-cell', sortable: false,
                cellRenderer: this.actiesCellRenderer, minWidth: 75, maxWidth: 75 }
        ];
    };
    AuteurWidget.prototype.actiesCellRenderer = function (params) {
        if (params.data) {
            var container = document.createElement('span');
            var openLink = document.createElement('a');
            openLink.setAttribute('target', '_blank');
            openLink.setAttribute('href', params.data.uri);
            openLink.setAttribute('title', 'Bekijk deze auteur in de auteursdatabank');
            openLink.setAttribute('style', 'display: inline-flex');
            var openElement = document.createElement('i');
            openElement.className = 'fa fa-eye';
            openLink.appendChild(openElement);
            container.appendChild(openLink);
            return container;
        }
    };
    AuteurWidget.prototype.huidigeRelatiesCellRenderer = function (params) {
        if (params.value && params.value.length > 0) {
            var ul_1 = document.createElement('ul');
            var title = params.value.map(function (item) { return '- ' + item.naar_omschrijving; }).join('\n');
            ul_1.setAttribute('title', title);
            if (params.value.length < 3) {
                params.value.forEach(function (item) {
                    var li = document.createElement('li');
                    li.innerText = item.naar_omschrijving;
                    ul_1.appendChild(li);
                });
            }
            else {
                var li1 = document.createElement('li');
                li1.innerText = params.value[0].naar_omschrijving;
                var li2 = document.createElement('li');
                li2.innerText = "... en nog ".concat(params.value.length - 1, " andere");
                ul_1.append(li1, li2);
            }
            return ul_1;
        }
        return '';
    };
    AuteurWidget.prototype.setParameters = function (params) {
        var _a;
        var paramsObj = {
            tekst: this.zoekterm ? this.zoekterm + '*' : null,
            sort: null,
            type: this.auteurType
        };
        if (this.collegas) {
            var uris = (_a = this.validAuteurRelaties) === null || _a === void 0 ? void 0 : _a.map(function (isDeelVanRelatie) { return isDeelVanRelatie.naar_uri; });
            paramsObj['relatie'] = '[' + uris.join(',') + ']';
        }
        if (params.sortModel.length) {
            var sortModel = params.sortModel[0];
            paramsObj.sort = ((sortModel.sort === 'asc') ? '' : '-') + sortModel.colId;
        }
        return paramsObj;
    };
    AuteurWidget.prototype.isAnyRowSelected = function () {
        return this.gridOptions.api && this.gridOptions.api.getSelectedRows().length > 0;
    };
    AuteurWidget.prototype.filterValidRelaties = function (relaties) {
        var today = new Date();
        return relaties.filter(function (rel) {
            return rel.type.id === 1 &&
                (rel.startdatum === null || new Date(rel.startdatum) <= today) &&
                (rel.einddatum === null || new Date(rel.einddatum) >= today);
        });
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], AuteurWidget.prototype, "auteurType", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AuteurWidget.prototype, "service", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], AuteurWidget.prototype, "auteursUrl", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AuteurWidget.prototype, "isEigenaarVermogensrecht", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AuteurWidget.prototype, "isBeheerder", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], AuteurWidget.prototype, "auteurRelaties", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], AuteurWidget.prototype, "single", void 0);
    AuteurWidget = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_dialog_1.DialogService, aurelia_dialog_1.DialogController])
    ], AuteurWidget);
    return AuteurWidget;
}());
exports.AuteurWidget = AuteurWidget;

//# sourceMappingURL=auteur-widget.js.map
