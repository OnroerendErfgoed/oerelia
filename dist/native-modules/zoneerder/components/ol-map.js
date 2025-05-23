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
import { bindable, LogManager, PLATFORM, autoinject } from 'aurelia-framework';
import ol from 'openlayers';
import { Contour } from '../models/contour';
import { GeozoekdienstApiService } from '../../services/geozoekdienst.api-service';
import { CrabService } from '../../services/crab.api-service';
import { LayerType } from '../models/layerConfig.enums';
import { DialogService } from 'aurelia-dialog';
import { BaseMap } from './base-map';
import { bindingMode } from 'aurelia-binding';
import * as moment from 'moment';
import * as jsts from 'jsts';
var log = LogManager.getLogger('ol-map');
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
        _this.selectKunstwerk = false;
        _this.polygonIndex = 1;
        _this.circleIndex = 1;
        _this.totalArea = 0;
        log.debug('olMap::constructor', _this.zone);
        _this._defineProjections();
        _this.wktFormat = new ol.format.WKT();
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
        this.drawLayer.getSource().on('addfeature', function (featureEvent) {
            var feature = featureEvent.feature;
            log.debug('olMap::drawLayer::addfeature', feature);
            var name = feature.get('name');
            _this.drawLayerToZone(name);
            _this.zoomToExtent(_this.geoJsonFormatter.readGeometry(_this.zone).getExtent());
        });
        this.addZoneToDrawLayer();
    };
    OlMap.prototype.addZoneToDrawLayer = function (name) {
        var _this = this;
        if (name === void 0) { name = 'Zone'; }
        if (!this.drawLayer) {
            return;
        }
        var drawSource = this.drawLayer.getSource();
        drawSource.getFeatures().forEach(function (f) {
            drawSource.removeFeature(f);
        });
        if (!this.zone) {
            return;
        }
        var wktString = '';
        this.zone.coordinates.forEach(function (coords) {
            var polygon = new ol.geom.Polygon(coords);
            var feature = new ol.Feature({
                name: name,
                geometry: polygon
            });
            drawSource.addFeature(feature);
            _this.totalArea += polygon.getArea();
            wktString += _this.wktFormat.writeFeature(feature);
        });
        this.geometryObjectList = [{ name: name, wktString: wktString }];
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
                var wktString = _this.wktFormat.writeFeature(evt.feature);
                _this.geometryObjectList.push({ name: evt.feature.getProperties().name, wktString: wktString });
            });
        }
        else if (type === 'Circle') {
            this.mapInteractions.drawZone.on('drawend', function (evt) {
                evt.feature.setProperties({ name: "Cirkel ".concat(_this.circleIndex++) });
                var circleGeometry = evt.feature.getGeometry();
                var polygonGeometry = ol.geom.Polygon.fromCircle(circleGeometry);
                var polygonFeature = new ol.Feature(polygonGeometry);
                var wktString = _this.wktFormat.writeFeature(polygonFeature);
                _this.geometryObjectList.push({
                    name: evt.feature.getProperties().name,
                    wktString: wktString
                });
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
                        if (!_this.geometryObjectList.some(function (geometryObject) { return geometryObject.name === name; })) {
                            _this.geometryObjectList.push({ name: name, wktString: '' });
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
    OlMap.prototype.startKunstwerkSelect = function () {
        var _this = this;
        this.toggleDrawZone(false);
        this.resetSelect();
        this.selectKunstwerk = true;
        this.map.on('click', function (evt) {
            log.debug('KunstwerkSelect', evt);
            _this.apiService.searchKunstwerk(evt.coordinate, _this.mapProjection.getCode()).then(function (result) {
                _this.geoJsonFormatter.readFeatures(result).forEach(function (perceel) {
                    _this.drawKunstwerk(perceel);
                });
            });
        });
    };
    OlMap.prototype.drawPerceel = function (olFeature) {
        if (olFeature) {
            var name_1 = "Perceel ".concat(olFeature.get('CAPAKEY'));
            if (!this.geometryObjectList.some(function (geometryObject) { return geometryObject.name === name_1; })) {
                olFeature.set('name', name_1);
                this.drawLayer.getSource().addFeature(olFeature);
                var wktString = this.wktFormat.writeFeature(olFeature);
                this.geometryObjectList.push({ name: name_1, wktString: wktString });
            }
        }
        else {
            toastr.error('Er werd geen perceel gevonden op deze locatie.');
        }
    };
    OlMap.prototype.drawGebouw = function (olFeature) {
        if (olFeature) {
            var name_2 = "Gebouw ".concat(olFeature.get('OIDN'));
            if (!this.geometryObjectList.some(function (geometryObject) { return geometryObject.name === name_2; })) {
                olFeature.set('name', name_2);
                this.drawLayer.getSource().addFeature(olFeature);
                var wktString = this.wktFormat.writeFeature(olFeature);
                this.geometryObjectList.push({ name: name_2, wktString: wktString });
            }
        }
        else {
            toastr.error('Er werd geen gebouw gevonden op deze locatie.');
        }
    };
    OlMap.prototype.drawKunstwerk = function (olFeature) {
        if (olFeature) {
            var name_3 = "Kunstwerk ".concat(olFeature.get('OIDN'));
            if (!this.geometryObjectList.some(function (geometryObject) { return geometryObject.name === name_3; })) {
                olFeature.set('name', name_3);
                this.drawLayer.getSource().addFeature(olFeature);
                var wktString = this.wktFormat.writeFeature(olFeature);
                this.geometryObjectList.push({ name: name_3, wktString: wktString });
            }
        }
        else {
            toastr.error('Er werd geen kunstwerk gevonden op deze locatie.');
        }
    };
    OlMap.prototype.drawWKTzone = function (wkt) {
        try {
            var featureFromWKT = this.wktFormat.readFeature(wkt);
            var name_4 = "Polygoon ".concat(this.polygonIndex++);
            featureFromWKT.setProperties({
                name: name_4
            });
            this.drawLayer.getSource().addFeature(featureFromWKT);
            this.geometryObjectList.push({ name: name_4, wktString: this.WKTstring });
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
        var index = this.geometryObjectList.findIndex(function (geom) { return geom.name === name; });
        this.geometryObjectList.splice(index, 1);
    };
    OlMap.prototype.geoLocationClick = function () {
        var view = this.map.getView();
        var geolocation = new ol.Geolocation({
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
    OlMap.prototype.drawLayerToZone = function (name) {
        var _this = this;
        if (name === void 0) { name = 'Zone'; }
        this.totalArea = 0;
        var multiPolygon = new ol.geom.MultiPolygon([], 'XY');
        var features = this.drawLayer.getSource().getFeatures();
        features.forEach(function (feature) {
            var geom = feature.getGeometry();
            if (geom instanceof ol.geom.Polygon) {
                multiPolygon.appendPolygon(geom);
                _this.totalArea += geom.getArea();
            }
            else if (geom instanceof ol.geom.MultiPolygon) {
                geom.getPolygons().forEach(function (polygon) {
                    multiPolygon.appendPolygon(polygon);
                    _this.totalArea += polygon.getArea();
                });
            }
            else if (geom instanceof ol.geom.Circle) {
                multiPolygon.appendPolygon(ol.geom.Polygon.fromCircle(geom));
                _this.totalArea += Math.PI * Math.pow(geom.getRadius(), 2);
            }
        });
        var contour = this.formatGeoJson(multiPolygon);
        if (this.zone) {
            this.zone.coordinates = contour.coordinates;
        }
        else {
            this.zone = new Contour(contour);
            setTimeout(function () {
                _this.addZoneToDrawLayer(name);
            });
        }
        this.laatstGealigneerd = undefined;
    };
    OlMap.prototype.resetSelect = function () {
        this.selectPerceel = false;
        this.selectGebouw = false;
        this.selectKunstwerk = false;
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
        var drawZoneInteraction = new ol.interaction.Draw({
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
            type: LayerType.Vector,
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
            viewModel: PLATFORM.moduleName('oerelia/zoneerder/components/zone-vergelijking-dialog'),
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
        bindable,
        __metadata("design:type", Boolean)
    ], OlMap.prototype, "disabled", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Contour)
    ], OlMap.prototype, "zone", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Array)
    ], OlMap.prototype, "adrespunten", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], OlMap.prototype, "isCollapsed", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], OlMap.prototype, "serviceConfig", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], OlMap.prototype, "showGrbTool", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Function)
    ], OlMap.prototype, "alignGrb", void 0);
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], OlMap.prototype, "laatstGealigneerd", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], OlMap.prototype, "showSelectGebouw", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Boolean)
    ], OlMap.prototype, "showSelectKunstwerk", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Number)
    ], OlMap.prototype, "alignerAreaLimit", void 0);
    __decorate([
        bindable,
        __metadata("design:type", GeozoekdienstApiService)
    ], OlMap.prototype, "apiService", void 0);
    OlMap = __decorate([
        autoinject,
        __metadata("design:paramtypes", [Element,
            CrabService,
            DialogService])
    ], OlMap);
    return OlMap;
}(BaseMap));
export { OlMap };

//# sourceMappingURL=ol-map.js.map
