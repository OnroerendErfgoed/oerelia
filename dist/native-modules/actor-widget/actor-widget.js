var ActorWidget = (function () {
    function ActorWidget() {
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
        this.gridOptions = {};
        this.gridOptions.context = this;
        this.gridOptions.enableColResize = true;
        this.gridOptions.suppressMovableColumns = true;
        this.gridOptions.suppressClickEdit = true;
        this.gridOptions.enableServerSideSorting = true;
        this.gridOptions.headerHeight = 30;
        this.gridOptions.rowHeight = 25;
        this.gridOptions.rowModelType = 'infinite';
        this.gridOptions.rowData = null;
        this.gridOptions.infiniteInitialRowCount = 1;
        this.gridOptions.cacheBlockSize = 50;
    }
    ActorWidget.prototype.activate = function (model) {
        this.scope = model;
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
                params.context.scope.actorenApiService.getActoren(params.startRow, params.endRow, paramsObj)
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
            this.scope.actorenApiService.getActorById(params.data.id)
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
        this.scope.dialogService.controllers[0].ok({ 'scope': this.scope, 'actor': this.selectedActor });
    };
    ActorWidget.prototype.annuleren = function () {
        this.scope.dialogService.controllers[0].cancel();
    };
    ActorWidget.prototype.loadLanden = function () {
        var _this = this;
        this.scope.crabService.getLanden().then(function (landen) {
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
            _this.scope.crabService.getGemeenten().then(function (gemeenten) {
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
                _this.scope.crabService.getPostcodes(gemeente).then(function (postcodes) {
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
                _this.scope.crabService.getStraten(gemeente).then(function (straten) {
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
                _this.scope.crabService.getHuisnrs(straat).then(function (huisnrs) {
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
    return ActorWidget;
}());
export { ActorWidget };

//# sourceMappingURL=actor-widget.js.map
