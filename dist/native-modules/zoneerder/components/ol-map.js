var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindingMode } from 'aurelia-binding';
import { bindable, inject, LogManager } from 'aurelia-framework';
import ol from 'openlayers';
import proj4 from 'proj4';
import { Contour } from '../models/contour';
import { GeozoekdienstApiService } from '../../services/geozoekdienst.api-service';
import { Layerswitcher } from './ol-layerswitcher';
import { CrabService } from '../../services/crab.api-service';
import { LayerType } from '../models/layerConfig.enums';
import { defaultButtonConfig } from '../models/buttonConfig.defaults';
import { defaultLayerConfig } from '../models/layerConfig.defaults';
var log = LogManager.getLogger('ol-map');
var OlMap = (function () {
    function OlMap(element, crabService) {
        this.element = element;
        this.crabService = crabService;
        this.geometryObjectList = [];
        this.isDrawing = false;
        this.isDrawingCircle = false;
        this.selectPerceel = false;
        this.extentVlaanderen = [9928.0, 66928.0, 272072.0, 329072.0];
        this.initialized = false;
        this.polygonIndex = 1;
        this.circleIndex = 1;
        log.debug('olMap::constructor', this.zone);
        this._defineProjections();
    }
    OlMap.prototype.attached = function () {
        var _this = this;
        log.debug('olMap::attached', this.zone);
        this._createMap();
        this._createMapButtons();
        this._createLayers();
        this._createInteractions('Polygon', false);
        this.element.dispatchEvent(new CustomEvent('loaded', {
            bubbles: true
        }));
        this.addZoneToDrawLayer();
        this.drawLayer.getSource().on('addfeature', function (feature) {
            log.debug('olMap::drawLayer::addfeature', feature);
            _this.drawLayerToZone();
        });
    };
    OlMap.prototype.addZoneToDrawLayer = function () {
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
            var feature = new ol.Feature({
                name: 'Zone',
                geometry: new ol.geom.Polygon(coords)
            });
            drawSource.addFeature(feature);
        });
        if (this.geometryObjectList.indexOf('Zone') === -1) {
            this.geometryObjectList.push('Zone');
        }
        this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
    };
    OlMap.prototype.zoneChanged = function (zone) {
        this.addZoneToDrawLayer();
    };
    OlMap.prototype.bind = function () {
        this.buttonConfig = this.buttonConfig || defaultButtonConfig;
        this.layerConfig = this.layerConfig || defaultLayerConfig;
    };
    OlMap.prototype.updateMapSize = function () {
        log.debug('olMap::updateMapSize');
        this.map.updateSize();
    };
    OlMap.prototype.disabledChanged = function (newValue, oldValue) {
        log.debug('olMap::disabledChanged', newValue, oldValue);
        if (this.initialized) {
            this.updateMapSize();
        }
    };
    OlMap.prototype.zoomToExtent = function (extent) {
        this.updateMapSize();
        this.map.getView().fit(extent, { maxZoom: 14 });
    };
    OlMap.prototype.zoomToFeatures = function () {
        this.zoomToExtent(this.drawLayer.getSource().getExtent());
    };
    OlMap.prototype.getMapInfo = function () {
        return this.map.getView().getZoom();
    };
    OlMap.prototype.formatGeoJson = function (feature) {
        var geojson = this.geoJsonFormatter.writeGeometryObject(feature);
        Object.defineProperty(geojson, 'crs', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                type: 'name', properties: {
                    name: 'urn:ogc:def:crs:EPSG::31370'
                }
            }
        });
        return geojson;
    };
    OlMap.prototype.transformBoundingboxToMapExtent = function (boundingbox) {
        var lowerleft = this.transformLatLonToPoint(boundingbox.lowerleft.lat, boundingbox.lowerleft.lon);
        var upperright = this.transformLatLonToPoint(boundingbox.upperright.lat, boundingbox.upperright.lon);
        return [lowerleft.getCoordinates()[0], lowerleft.getCoordinates()[1],
            upperright.getCoordinates()[0], upperright.getCoordinates()[1]];
    };
    OlMap.prototype.transformLatLonToPoint = function (lat, lon) {
        var point = new ol.geom.Point([lon, lat]);
        return point.transform('EPSG:4326', 'EPSG:31370');
    };
    OlMap.prototype.startDrawZone = function (type) {
        var _this = this;
        this.resetSelect();
        this.toggleDrawZone(true, type);
        if (type === 'Polygon') {
            this.mapInteractions.drawZone.on('drawend', function (evt) {
                evt.feature.setProperties({ name: "Polygoon " + _this.polygonIndex++ });
                _this.geometryObjectList.push(evt.feature.getProperties().name);
            });
        }
        else if (type === 'Circle') {
            this.mapInteractions.drawZone.on('drawend', function (evt) {
                evt.feature.setProperties({ name: "Cirkel " + _this.circleIndex++ });
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
        this.selectPerceel = true;
        this.map.on('click', function (evt) {
            log.debug('Perceelselect', evt);
            _this.apiService.searchPerceel(evt.coordinate, _this.mapProjection.getCode()).then(function (result) {
                _this.geoJsonFormatter.readFeatures(result).forEach(function (perceel) { _this.drawPerceel(perceel); });
            });
        });
    };
    OlMap.prototype.drawPerceel = function (olFeature) {
        if (olFeature) {
            var name_1 = "Perceel " + olFeature.get('CAPAKEY');
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
    OlMap.prototype.drawWKTzone = function (wkt) {
        var wktParser = new ol.format.WKT();
        try {
            var featureFromWKT = wktParser.readFeature(wkt);
            var name_2 = "Polygoon " + this.polygonIndex++;
            featureFromWKT.setProperties({
                name: name_2
            });
            this.drawLayer.getSource().addFeature(featureFromWKT);
            this.geometryObjectList.push(name_2);
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
    OlMap.prototype.drawLayerToZone = function () {
        var multiPolygon = new ol.geom.MultiPolygon([], 'XY');
        var features = this.drawLayer.getSource().getFeatures();
        features.forEach(function (feature) {
            var geom = feature.getGeometry();
            if (geom instanceof ol.geom.Polygon) {
                multiPolygon.appendPolygon(geom);
            }
            else if (geom instanceof ol.geom.MultiPolygon) {
                geom.getPolygons().forEach(function (polygon) {
                    multiPolygon.appendPolygon(polygon);
                });
            }
            else if (geom instanceof ol.geom.Circle) {
                multiPolygon.appendPolygon(ol.geom.Polygon.fromCircle(geom));
            }
        });
        var contour = this.formatGeoJson(multiPolygon);
        !!this.zone ? this.zone.coordinates = contour.coordinates
            : this.zone = new Contour(contour);
    };
    OlMap.prototype.resetSelect = function () {
        this.selectPerceel = false;
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
    OlMap.prototype._createMap = function () {
        var target = this.mapnode;
        this.map = new ol.Map({
            layers: [],
            target: target,
            view: new ol.View({
                center: ol.extent.getCenter(this.mapProjection.getExtent()),
                projection: this.mapProjection,
                zoom: 2,
                maxZoom: 21
            }),
            controls: ol.control.defaults({
                attribution: false,
                rotate: false,
                zoom: false
            })
        });
        this.map.addControl(new ol.control.ScaleLine());
        this.map.addControl(new ol.control.Attribution({
            collapsible: false
        }));
        this.map.addControl(new Layerswitcher({
            tipLabel: 'Verander de kaartlagen',
            title: 'Kaartlagen'
        }));
        this.map.getView().fit(this.mapProjection.getExtent());
        this.updateMapSize();
        this.initialized = true;
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
    OlMap.prototype._defineProjections = function () {
        proj4.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 ' +
            '+lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl ' +
            '+towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
        proj4.defs('urn:ogc:def:crs:EPSG::31370', proj4.defs('EPSG:31370'));
        proj4.defs('urn:ogc:def:crs:EPSG:6.9:31370', proj4.defs('EPSG:31370'));
        proj4.defs('urn:x-ogc:def:crs:EPSG:31370', proj4.defs('EPSG:31370'));
        proj4.defs('http://www.opengis.net/gml/srs/epsg.xml#31370', proj4.defs('EPSG:31370'));
        proj4.defs('EPSG:3812', '+proj=lcc +lat_1=49.83333333333334 +lat_2=51.16666666666666 ' +
            '+lat_0=50.797815 +lon_0=4.359215833333333 +x_0=649328 +y_0=665262 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 ' +
            '+units=m +no_defs');
        ol.proj.setProj4(proj4);
        var projection = ol.proj.get('EPSG:31370');
        projection.setExtent(this.extentVlaanderen);
        this.mapProjection = projection;
        this.geoJsonFormatter = new ol.format.GeoJSON({
            defaultDataProjection: this.mapProjection,
            featureProjection: this.mapProjection
        });
    };
    OlMap.prototype._createLayers = function () {
        var _this = this;
        log.debug('Create layers', this.layerConfig);
        var layers = Object.keys(this.layerConfig.baseLayers)
            .map(function (id) { return ({ id: id, options: _this.layerConfig.baseLayers[id] }); })
            .map(function (_a) {
            var id = _a.id, options = _a.options;
            return _this._createLayer(id, options, true);
        });
        var baseLayerGroup = new ol.layer.Group({ layers: layers });
        baseLayerGroup.set('title', 'Achtergrond kaart');
        this.map.addLayer(baseLayerGroup);
        var overlays = Object.keys(this.layerConfig.overlays)
            .map(function (id) { return ({ id: id, options: _this.layerConfig.overlays[id] }); })
            .map(function (_a) {
            var id = _a.id, options = _a.options;
            return _this._createLayer(id, options, false);
        });
        overlays.forEach(function (layer) { return _this.map.addLayer(layer); });
        this.drawLayer = this._createVectorLayer({
            color: 'rgb(39, 146, 195)',
            fill: 'rgba(39, 146, 195, 0.3)',
            title: 'Zone'
        });
        this.map.addLayer(this.drawLayer);
    };
    OlMap.prototype._createLayer = function (id, layerOptions, isBaseLayer) {
        var layer;
        if (layerOptions.type === LayerType.GRB || layerOptions.type === LayerType.DHMV || layerOptions.type === LayerType.OMWRGBMRVL)
            layer = this._createGrbLayer(id, layerOptions.type);
        else if (layerOptions.type === LayerType.GrbWMS)
            layer = this._createGrbWMSLayer(layerOptions.wmsLayers);
        else if (layerOptions.type === LayerType.ErfgoedWms)
            layer = this._createErfgoedWMSLayer(layerOptions.wmsLayers);
        else if (layerOptions.type === LayerType.Ngi)
            layer = this._createNgiLayer(id);
        layer.set('title', layerOptions.title);
        layer.set('type', isBaseLayer ? 'base' : 'overlay');
        layer.setVisible(!!layerOptions.visible);
        return layer;
    };
    OlMap.prototype._createGrbLayer = function (grbLayerId, type) {
        var resolutions = [];
        var matrixIds = [];
        var maxResolution = ol.extent.getWidth(this.mapProjection.getExtent()) / 256;
        var origin = ol.extent.getTopLeft(this.mapProjection.getExtent());
        for (var i = 0; i < 16; i++) {
            matrixIds[i] = i.toString();
            resolutions[i] = maxResolution / Math.pow(2, i);
        }
        return new ol.layer.Tile({
            source: new ol.source.WMTS({
                url: '//geo.api.vlaanderen.be/' + type + '/wmts',
                layer: grbLayerId,
                matrixSet: 'BPL72VL',
                format: 'image/png',
                projection: this.mapProjection,
                style: '',
                tileGrid: new ol.tilegrid.WMTS({ origin: origin, resolutions: resolutions, matrixIds: matrixIds }),
                attributions: '© <a href="https://www.vlaanderen.be/digitaal-vlaanderen" target="_blank" ' +
                    'title="Informatie Vlaanderen" class="copyrightLink">Digitaal Vlaanderen</a>'
            }),
            extent: this.mapProjection.getExtent()
        });
    };
    OlMap.prototype._createNgiLayer = function (layerId) {
        var matrixIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        var resolutions = [1058.3333333327998, 529.1666666663999, 211.66666666656, 132.29166666659998, 66.14583333344,
            26.45833333332, 13.22916666666, 6.614583333344, 2.6458333333319994, 1.3229166666659997, 0.6614583333343999];
        var origin = [450000, 800000];
        return new ol.layer.Tile({
            source: new ol.source.WMTS({
                urls: ['https://cartoweb.wmts.ngi.be/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
                requestEncoding: 'REST',
                layer: layerId,
                matrixSet: '3812',
                format: 'image/png',
                projection: 'EPSG:3812',
                style: 'default',
                tileGrid: new ol.tilegrid.WMTS({ origin: origin, resolutions: resolutions, matrixIds: matrixIds }),
                attributions: '© <a href="https://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
                    'class="copyrightLink">NGI</a>'
            }),
            visible: false
        });
    };
    OlMap.prototype._createGrbWMSLayer = function (wmsLayers) {
        return new ol.layer.Tile({
            extent: this.mapProjection.getExtent(),
            source: new ol.source.TileWMS(({
                url: '//geo.api.vlaanderen.be/' + LayerType.GRB + '/wms',
                params: { LAYERS: wmsLayers, TILED: true },
                serverType: 'geoserver'
            })),
            maxResolution: 2000,
            visible: false
        });
    };
    OlMap.prototype._createErfgoedWMSLayer = function (wmsLayers) {
        return new ol.layer.Tile({
            extent: this.mapProjection.getExtent(),
            source: new ol.source.TileWMS(({
                url: this.serviceConfig.beschermingenWMSUrl || 'https://geo.onroerenderfgoed.be/geoserver/wms',
                params: { LAYERS: wmsLayers, TILED: true },
                serverType: 'geoserver',
                attributions: '© <a href="https://www.onroerenderfgoed.be">Onroerend Erfgoed</a>'
            })),
            maxResolution: 2000,
            visible: false
        });
    };
    OlMap.prototype._createVectorLayer = function (options) {
        var vectorSource = new ol.source.Vector({});
        var textStyleFunction = function (feature) {
            var text = feature.get('name') ? feature.get('name') : '';
            return new ol.style.Text({
                font: '10px Verdana',
                text: text,
                fill: new ol.style.Fill({
                    color: options.color
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                })
            });
        };
        var styleFunction = function (feature) {
            var styleText = textStyleFunction(feature);
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: options.color,
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: options.fill
                }),
                text: styleText
            });
            return [style];
        };
        var vLayer = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction,
            visible: true
        });
        vLayer.set('title', options.title);
        vLayer.set('type', 'overlay');
        return vLayer;
    };
    OlMap.prototype._createMapButtons = function () {
        var buttonHeight = 2.2;
        var target = this.map.getTargetElement();
        var top = 0.8;
        if (this.buttonConfig.fullscreen) {
            var className_1 = 'full-screen';
            var style_1 = this.getButtonStyle(top);
            this.addFullscreenButton(className_1);
            this.setStyleToButton(target, className_1, style_1);
            top += buttonHeight;
        }
        if (this.buttonConfig.zoomInOut) {
            var className_2 = 'zoom';
            var style_2 = this.getButtonStyle(top);
            this.addZoomButton(className_2);
            this.setStyleToButton(target, className_2, style_2);
            top += 3.8;
        }
        var className = 'layer-switcher';
        var style = this.getButtonStyle(top);
        this.setStyleToButton(target, className, style);
        top += buttonHeight;
        if (this.buttonConfig.zoomFullExtent) {
            var className_3 = 'fullextent';
            var style_3 = this.getButtonStyle(top);
            this.addZoomToExtentButton(className_3);
            this.setStyleToButton(target, className_3, style_3);
            top += buttonHeight;
        }
        if (this.buttonConfig.zoomGeoLocation) {
            var className_4 = 'geolocation';
            var style_4 = this.getButtonStyle(top);
            this.setStyleToButton(target, className_4, style_4);
            top += buttonHeight;
        }
        if (this.buttonConfig.rotate) {
            var className_5 = 'rotate';
            var style_5 = this.getButtonStyle(top);
            this.addRotateButton(className_5);
            this.setStyleToButton(target, className_5, style_5);
            top += buttonHeight;
        }
        if (this.buttonConfig.zoomSwitcher) {
            var className_6 = 'zoom-switcher';
            var style_6 = this.getButtonStyle(top);
            this.setStyleToButton(target, className_6, style_6);
        }
    };
    OlMap.prototype.addFullscreenButton = function (className) {
        this.map.addControl(new ol.control.FullScreen({
            tipLabel: 'Vergroot / verklein het scherm',
            className: className,
            label: ''
        }));
    };
    OlMap.prototype.addZoomButton = function (className) {
        this.map.addControl(new ol.control.Zoom({
            zoomInTipLabel: 'Zoom in',
            zoomOutTipLabel: 'Zoom uit',
            className: className
        }));
    };
    OlMap.prototype.addZoomToExtentButton = function (className) {
        this.map.addControl(new ol.control.ZoomToExtent({
            extent: this.mapProjection.getExtent(),
            tipLabel: 'Zoom naar Vlaanderen',
            className: className,
            label: ''
        }));
    };
    OlMap.prototype.addRotateButton = function (className) {
        this.map.addControl(new ol.control.Rotate({
            tipLabel: 'Draai de kaart naar het noorden',
            className: className
        }));
    };
    OlMap.prototype.getButtonStyle = function (top) {
        return 'top: ' + top + 'em; left: ' + .5 + 'em;';
    };
    OlMap.prototype.setStyleToButton = function (target, className, style) {
        target.getElementsByClassName(className)
            .item(0)
            .setAttribute('style', style);
    };
    OlMap.prototype.transformLambert72ToWebMercator = function (center) {
        var point = new ol.geom.Point([center[0], center[1]]);
        var transFormedPoint = point.transform('EPSG:31370', 'EPSG:3857');
        return transFormedPoint.getCoordinates();
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
        __metadata("design:type", GeozoekdienstApiService)
    ], OlMap.prototype, "apiService", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], OlMap.prototype, "buttonConfig", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], OlMap.prototype, "layerConfig", void 0);
    OlMap = __decorate([
        inject(Element, CrabService),
        __metadata("design:paramtypes", [Element,
            CrabService])
    ], OlMap);
    return OlMap;
}());
export { OlMap };

//# sourceMappingURL=ol-map.js.map
