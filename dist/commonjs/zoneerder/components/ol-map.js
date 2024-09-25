"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.OlMap = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var openlayers_1 = require("openlayers");
var contour_1 = require("../models/contour");
var geozoekdienst_api_service_1 = require("../../services/geozoekdienst.api-service");
var crab_api_service_1 = require("../../services/crab.api-service");
var layerConfig_enums_1 = require("../models/layerConfig.enums");
var aurelia_dialog_1 = require("aurelia-dialog");
var base_map_1 = require("./base-map");
var aurelia_binding_1 = require("aurelia-binding");
var moment = require("moment");
var jsts = require("jsts");
var log = aurelia_framework_1.LogManager.getLogger('ol-map');
var OlMap = (function (_super) {
    __extends(OlMap, _super);
    function OlMap(element, crabService, dialogService) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.crabService = crabService;
        _this.dialogService = dialogService;
        _this.showGrbTool = false;
        _this.geometryObjectList = [];
        _this.isDrawing = false;
        _this.isDrawingCircle = false;
        _this.selectPerceel = false;
        _this.selectGebouw = false;
        _this.polygonIndex = 1;
        _this.circleIndex = 1;
        _this.totalArea = 0;
        log.debug('olMap::constructor', _this.zone);
        _this._defineProjections();
        return _this;
    }
    OlMap.prototype.attached = function () {
        var _this = this;
        this.initialLaatstGealigneerd = this.laatstGealigneerd;
        log.debug('olMap::attached', this.zone);
        this._createMap();
        this._createMapButtons();
        this._createLayers();
        this._createDrawLayer();
        this._createInteractions('Polygon', false);
        this.element.dispatchEvent(new CustomEvent('loaded', {
            bubbles: true
        }));
        this.drawLayer.getSource().on('addfeature', function (feature) {
            log.debug('olMap::drawLayer::addfeature', feature);
            _this.drawLayerToZone();
            _this.zoomToExtent(_this.geoJsonFormatter.readGeometry(_this.zone).getExtent());
        });
        this.addZoneToDrawLayer();
    };
    OlMap.prototype.addZoneToDrawLayer = function () {
        var _this = this;
        if (!this.drawLayer) {
            return;
        }
        var drawSource = this.drawLayer.getSource();
        drawSource.getFeatures().forEach(function (f) {
            drawSource.removeFeature(f);
        });
        this.geometryObjectList = [];
        if (!this.zone) {
            return;
        }
        this.zone.coordinates.forEach(function (coords) {
            var polygon = new openlayers_1.default.geom.Polygon(coords);
            var feature = new openlayers_1.default.Feature({
                name: 'Zone',
                geometry: polygon
            });
            drawSource.addFeature(feature);
            _this.totalArea += polygon.getArea();
        });
        if (this.geometryObjectList.indexOf('Zone') === -1) {
            this.geometryObjectList.push('Zone');
        }
    };
    OlMap.prototype.zoneChanged = function () {
        this.addZoneToDrawLayer();
    };
    OlMap.prototype.disabledChanged = function (newValue, oldValue) {
        log.debug('olMap::disabledChanged', newValue, oldValue);
        if (this.initialized) {
            this.updateMapSize();
        }
    };
    OlMap.prototype.zoomToFeatures = function () {
        this.zoomToExtent(this.drawLayer.getSource().getExtent());
    };
    OlMap.prototype.startDrawZone = function (type) {
        var _this = this;
        this.resetSelect();
        this.toggleDrawZone(true, type);
        if (type === 'Polygon') {
            this.mapInteractions.drawZone.on('drawend', function (evt) {
                evt.feature.setProperties({ name: "Polygoon ".concat(_this.polygonIndex++) });
                _this.geometryObjectList.push(evt.feature.getProperties().name);
            });
        }
        else if (type === 'Circle') {
            this.mapInteractions.drawZone.on('drawend', function (evt) {
                evt.feature.setProperties({ name: "Cirkel ".concat(_this.circleIndex++) });
                _this.geometryObjectList.push(evt.feature.getProperties().name);
            });
        }
    };
    OlMap.prototype.importAdrespunten = function () {
        var _this = this;
        if (this.adrespunten && this.adrespunten.length > 0) {
            this.adrespunten.forEach(function (a) {
                _this.apiService.searchPerceel(a.coordinates[0], _this.mapProjection.getCode()).then(function (result) {
                    _this.geoJsonFormatter.readFeatures(result).forEach(function (perceel) {
                        var name = 'Adrespunten';
                        perceel.set('name', name);
                        _this.drawLayer.getSource().addFeature(perceel);
                        if (_this.geometryObjectList.indexOf(name) === -1) {
                            _this.geometryObjectList.push(name);
                        }
                    });
                });
            });
        }
        else {
            toastr.error('Er kan geen algemene locatie afgeleid worden omdat geen enkel locatie-element een punt bevat.');
        }
    };
    OlMap.prototype.startPerceelSelect = function () {
        var _this = this;
        this.toggleDrawZone(false);
        this.resetSelect();
        this.selectPerceel = true;
        this.map.on('click', function (evt) {
            log.debug('Perceelselect', evt);
            _this.apiService.searchPerceel(evt.coordinate, _this.mapProjection.getCode()).then(function (result) {
                _this.geoJsonFormatter.readFeatures(result).forEach(function (perceel) {
                    _this.drawPerceel(perceel);
                });
            });
        });
    };
    OlMap.prototype.startGebouwSelect = function () {
        var _this = this;
        this.toggleDrawZone(false);
        this.resetSelect();
        this.selectGebouw = true;
        this.map.on('click', function (evt) {
            log.debug('GebouwSelect', evt);
            _this.apiService.searchGebouw(evt.coordinate, _this.mapProjection.getCode()).then(function (result) {
                _this.geoJsonFormatter.readFeatures(result).forEach(function (perceel) {
                    _this.drawGebouw(perceel);
                });
            });
        });
    };
    OlMap.prototype.drawPerceel = function (olFeature) {
        if (olFeature) {
            var name_1 = "Perceel ".concat(olFeature.get('CAPAKEY'));
            if (this.geometryObjectList.indexOf(name_1) === -1) {
                olFeature.set('name', name_1);
                this.drawLayer.getSource().addFeature(olFeature);
                this.geometryObjectList.push(name_1);
            }
        }
        else {
            toastr.error('Er werd geen perceel gevonden op deze locatie.');
        }
    };
    OlMap.prototype.drawGebouw = function (olFeature) {
        if (olFeature) {
            var name_2 = "Gebouw ".concat(olFeature.get('OIDN'));
            if (this.geometryObjectList.indexOf(name_2) === -1) {
                olFeature.set('name', name_2);
                this.drawLayer.getSource().addFeature(olFeature);
                this.geometryObjectList.push(name_2);
            }
        }
        else {
            toastr.error('Er werd geen gebouw gevonden op deze locatie.');
        }
    };
    OlMap.prototype.drawWKTzone = function (wkt) {
        var wktParser = new openlayers_1.default.format.WKT();
        try {
            var featureFromWKT = wktParser.readFeature(wkt);
            var name_3 = "Polygoon ".concat(this.polygonIndex++);
            featureFromWKT.setProperties({
                name: name_3
            });
            this.drawLayer.getSource().addFeature(featureFromWKT);
            this.geometryObjectList.push(name_3);
            this.zoomToFeatures();
            this.WKTstring = '';
        }
        catch (error) {
            toastr.error(error, 'Dit is een ongeldige WKT geometrie.');
        }
    };
    OlMap.prototype.removeGeometryObject = function (name) {
        var drawLayerSource = this.drawLayer.getSource();
        var featuresToRemove = drawLayerSource.getFeatures().filter(function (feature) {
            return feature.getProperties().name === name;
        });
        featuresToRemove.forEach(function (featureToRemove) {
            drawLayerSource.removeFeature(featureToRemove);
        });
        this.drawLayerToZone();
        if (this.zone.coordinates.length === 0) {
            this.zone = null;
        }
        this.geometryObjectList.splice(this.geometryObjectList.indexOf(name), 1);
    };
    OlMap.prototype.geoLocationClick = function () {
        var view = this.map.getView();
        var geolocation = new openlayers_1.default.Geolocation({
            projection: this.map.getView().getProjection(),
            trackingOptions: {
                enableHighAccuracy: true
            }
        });
        geolocation.setTracking(true);
        geolocation.once('change:position', function () {
            view.setCenter(geolocation.getPosition());
            view.setZoom(18);
            geolocation.setTracking(false);
        });
    };
    OlMap.prototype.zoomButtonClick = function () {
        var view = this.map.getView();
        var center = view.getCenter();
        var zoom = view.getZoom();
        var coordinates = this.transformLambert72ToWebMercator(center);
        window.open((this.serviceConfig.crabpyUrl) + '/#zoom=' + zoom * 2 + '&lat=' + coordinates[1] + '&lon=' + coordinates[0]);
    };
    OlMap.prototype.drawLayerToZone = function () {
        var _this = this;
        this.totalArea = 0;
        var multiPolygon = new openlayers_1.default.geom.MultiPolygon([], 'XY');
        var features = this.drawLayer.getSource().getFeatures();
        features.forEach(function (feature) {
            var geom = feature.getGeometry();
            if (geom instanceof openlayers_1.default.geom.Polygon) {
                multiPolygon.appendPolygon(geom);
                _this.totalArea += geom.getArea();
            }
            else if (geom instanceof openlayers_1.default.geom.MultiPolygon) {
                geom.getPolygons().forEach(function (polygon) {
                    multiPolygon.appendPolygon(polygon);
                    _this.totalArea += polygon.getArea();
                });
            }
            else if (geom instanceof openlayers_1.default.geom.Circle) {
                multiPolygon.appendPolygon(openlayers_1.default.geom.Polygon.fromCircle(geom));
                _this.totalArea += Math.PI * Math.pow(geom.getRadius(), 2);
            }
        });
        var contour = this.formatGeoJson(multiPolygon);
        !!this.zone ? this.zone.coordinates = contour.coordinates
            : this.zone = new contour_1.Contour(contour);
        this.laatstGealigneerd = undefined;
    };
    OlMap.prototype.resetSelect = function () {
        this.selectPerceel = false;
        this.selectGebouw = false;
        this.map.removeEventListener('click');
    };
    OlMap.prototype.toggleDrawZone = function (bool, type) {
        type ? this._createInteractions(type, bool) : this._createInteractions('Polygon', false);
        switch (type) {
            case 'Polygon': {
                this.isDrawing = bool;
                this.isDrawingCircle = false;
                break;
            }
            case 'Circle': {
                this.isDrawing = false;
                this.isDrawingCircle = bool;
                break;
            }
            default: {
                this.isDrawing = false;
                this.isDrawingCircle = false;
                break;
            }
        }
        if (!bool) {
            this.mapInteractions.drawZone.removeEventListener('drawend');
        }
    };
    OlMap.prototype._createInteractions = function (type, setActive) {
        log.debug('olMap::_createInteractions');
        this.map.getInteractions().pop();
        var drawZoneInteraction = new openlayers_1.default.interaction.Draw({
            type: (type),
            source: this.drawLayer.getSource(),
            freehand: false
        });
        this.map.addInteraction(drawZoneInteraction);
        drawZoneInteraction.setActive(setActive);
        this.mapInteractions = {
            drawZone: drawZoneInteraction
        };
    };
    OlMap.prototype._createDrawLayer = function () {
        this.drawLayer = this._createLayer('drawLayer', {
            type: layerConfig_enums_1.LayerType.Vector,
            style: {
                stroke: 'rgb(39, 146, 195)',
                fill: 'rgba(39, 146, 195, 0.3)',
            },
            title: 'Zone',
            visible: true
        });
        this.map.addLayer(this.drawLayer);
    };
    OlMap.prototype.showZoneVergelijkingDialog = function () {
        var _this = this;
        void this.dialogService.open({
            viewModel: aurelia_framework_1.PLATFORM.moduleName('oerelia/zoneerder/components/zone-vergelijking-dialog'),
            model: { zone: this.zone, alignGrb: this.alignGrb, laatstGealigneerd: this.laatstGealigneerd },
            host: this.mapnode
        }).whenClosed(function (response) {
            if (!response.wasCancelled) {
                var geom = response.output.resultaat;
                var multiPolygon = _this.createMultiPolygon(geom['geometries'] || [geom]);
                _this.zone = _this.formatGeoJson(multiPolygon);
                setTimeout(function () {
                    _this.laatstGealigneerd = response.output.laatstGealigneerd;
                });
            }
        });
    };
    OlMap.prototype.createMultiPolygon = function (geometries) {
        var parser = new jsts.io.GeoJSONReader();
        var geoWriter = new jsts.io.GeoJSONWriter();
        var factory = new jsts.geom.GeometryFactory();
        var unionedGeom = factory.createMultiPolygon([]);
        geometries.forEach(function (geom) {
            if (geom.type === 'Polygon' || geom.type === 'MultiPolygon') {
                var polygon = parser.read(geom);
                unionedGeom = unionedGeom.union(polygon);
            }
        });
        if (unionedGeom instanceof jsts.geom.Polygon) {
            unionedGeom = factory.createMultiPolygon([unionedGeom]);
        }
        return this.geoJsonFormatter.readGeometry(geoWriter.write(unionedGeom));
    };
    OlMap.prototype.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY [om] HH:mm');
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], OlMap.prototype, "disabled", void 0);
    __decorate([
        (0, aurelia_framework_1.bindable)({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay }),
        __metadata("design:type", contour_1.Contour)
    ], OlMap.prototype, "zone", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Array)
    ], OlMap.prototype, "adrespunten", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], OlMap.prototype, "isCollapsed", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], OlMap.prototype, "serviceConfig", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], OlMap.prototype, "showGrbTool", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Function)
    ], OlMap.prototype, "alignGrb", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], OlMap.prototype, "laatstGealigneerd", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Boolean)
    ], OlMap.prototype, "showSelectGebouw", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Number)
    ], OlMap.prototype, "alignerAreaLimit", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", geozoekdienst_api_service_1.GeozoekdienstApiService)
    ], OlMap.prototype, "apiService", void 0);
    OlMap = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [Element,
            crab_api_service_1.CrabService,
            aurelia_dialog_1.DialogService])
    ], OlMap);
    return OlMap;
}(base_map_1.BaseMap));
exports.OlMap = OlMap;

//# sourceMappingURL=ol-map.js.map
