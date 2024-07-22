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
exports.BaseMap = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var openlayers_1 = require("openlayers");
var proj4_1 = require("proj4");
var layerConfig_enums_1 = require("../models/layerConfig.enums");
var ol_layerswitcher_1 = require("./ol-layerswitcher");
var buttonConfig_defaults_1 = require("../models/buttonConfig.defaults");
var layerConfig_defaults_1 = require("../models/layerConfig.defaults");
var log = aurelia_framework_1.LogManager.getLogger('ol-map');
var BaseMap = (function () {
    function BaseMap() {
        this.extentVlaanderen = [9928.0, 66928.0, 272072.0, 329072.0];
        this.initialized = false;
    }
    BaseMap.prototype.bind = function () {
        this.buttonConfig = this.buttonConfig || buttonConfig_defaults_1.defaultButtonConfig;
        this.layerConfig = this.layerConfig || layerConfig_defaults_1.defaultLayerConfig;
    };
    BaseMap.prototype.updateMapSize = function () {
        log.debug('olMap::updateMapSize');
        this.map.updateSize();
    };
    BaseMap.prototype.zoomToExtent = function (extent) {
        this.updateMapSize();
        this.map.getView().fit(extent, { maxZoom: 14 });
    };
    BaseMap.prototype.formatGeoJson = function (feature) {
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
    BaseMap.prototype.getMapInfo = function () {
        return this.map.getView().getZoom();
    };
    BaseMap.prototype.transformBoundingboxToMapExtent = function (boundingbox) {
        var lowerleft = this.transformLatLonToPoint(boundingbox.lowerleft.lat, boundingbox.lowerleft.lon);
        var upperright = this.transformLatLonToPoint(boundingbox.upperright.lat, boundingbox.upperright.lon);
        return [lowerleft.getCoordinates()[0], lowerleft.getCoordinates()[1],
            upperright.getCoordinates()[0], upperright.getCoordinates()[1]];
    };
    BaseMap.prototype.transformLatLonToPoint = function (lat, lon) {
        var point = new openlayers_1.default.geom.Point([lon, lat]);
        return point.transform('EPSG:4326', 'EPSG:31370');
    };
    BaseMap.prototype.transformLambert72ToWebMercator = function (center) {
        var point = new openlayers_1.default.geom.Point([center[0], center[1]]);
        var transFormedPoint = point.transform('EPSG:31370', 'EPSG:3857');
        return transFormedPoint.getCoordinates();
    };
    BaseMap.prototype._createMap = function () {
        var target = this.mapnode;
        this.map = new openlayers_1.default.Map({
            layers: [],
            target: target,
            view: new openlayers_1.default.View({
                center: openlayers_1.default.extent.getCenter(this.mapProjection.getExtent()),
                projection: this.mapProjection,
                zoom: 2,
                maxZoom: 21
            }),
            controls: openlayers_1.default.control.defaults({
                attribution: false,
                rotate: false,
                zoom: false
            })
        });
        this.map.addControl(new openlayers_1.default.control.ScaleLine());
        this.map.addControl(new openlayers_1.default.control.Attribution({
            collapsible: false
        }));
        this.map.addControl(new ol_layerswitcher_1.Layerswitcher({
            tipLabel: 'Verander de kaartlagen',
            title: 'Kaartlagen'
        }));
        this.map.getView().fit(this.mapProjection.getExtent());
        this.updateMapSize();
        this.initialized = true;
    };
    BaseMap.prototype._createMapButtons = function () {
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
    BaseMap.prototype.getButtonStyle = function (top) {
        return 'top: ' + top + 'em; left: ' + .5 + 'em;';
    };
    BaseMap.prototype.setStyleToButton = function (target, className, style) {
        target.getElementsByClassName(className)
            .item(0)
            .setAttribute('style', style);
    };
    BaseMap.prototype.addZoomButton = function (className) {
        this.map.addControl(new openlayers_1.default.control.Zoom({
            zoomInTipLabel: 'Zoom in',
            zoomOutTipLabel: 'Zoom uit',
            className: className
        }));
    };
    BaseMap.prototype.addFullscreenButton = function (className) {
        this.map.addControl(new openlayers_1.default.control.FullScreen({
            tipLabel: 'Vergroot / verklein het scherm',
            className: className,
            label: ''
        }));
    };
    BaseMap.prototype.addZoomToExtentButton = function (className) {
        this.map.addControl(new openlayers_1.default.control.ZoomToExtent({
            extent: this.mapProjection.getExtent(),
            tipLabel: 'Zoom naar Vlaanderen',
            className: className,
            label: ''
        }));
    };
    BaseMap.prototype.addRotateButton = function (className) {
        this.map.addControl(new openlayers_1.default.control.Rotate({
            tipLabel: 'Draai de kaart naar het noorden',
            className: className
        }));
    };
    BaseMap.prototype._defineProjections = function () {
        proj4_1.default.defs('EPSG:31370', '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 ' +
            '+lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl ' +
            '+towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs');
        proj4_1.default.defs('urn:ogc:def:crs:EPSG::31370', proj4_1.default.defs('EPSG:31370'));
        proj4_1.default.defs('urn:ogc:def:crs:EPSG:6.9:31370', proj4_1.default.defs('EPSG:31370'));
        proj4_1.default.defs('urn:x-ogc:def:crs:EPSG:31370', proj4_1.default.defs('EPSG:31370'));
        proj4_1.default.defs('http://www.opengis.net/gml/srs/epsg.xml#31370', proj4_1.default.defs('EPSG:31370'));
        proj4_1.default.defs('EPSG:3812', '+proj=lcc +lat_1=49.83333333333334 +lat_2=51.16666666666666 ' +
            '+lat_0=50.797815 +lon_0=4.359215833333333 +x_0=649328 +y_0=665262 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 ' +
            '+units=m +no_defs');
        openlayers_1.default.proj.setProj4(proj4_1.default);
        var projection = openlayers_1.default.proj.get('EPSG:31370');
        projection.setExtent(this.extentVlaanderen);
        this.mapProjection = projection;
        this.geoJsonFormatter = new openlayers_1.default.format.GeoJSON({
            defaultDataProjection: this.mapProjection,
            featureProjection: this.mapProjection
        });
    };
    BaseMap.prototype._createLayers = function () {
        var _this = this;
        log.debug('Create layers', this.layerConfig);
        var layers = Object.keys(this.layerConfig.baseLayers)
            .map(function (id) { return ({ id: id, options: _this.layerConfig.baseLayers[id] }); })
            .map(function (_a) {
            var id = _a.id, options = _a.options;
            return _this._createLayer(id, options, true);
        });
        var baseLayerGroup = new openlayers_1.default.layer.Group({ layers: layers });
        baseLayerGroup.set('title', 'Achtergrond kaart');
        this.map.addLayer(baseLayerGroup);
        var overlays = Object.keys(this.layerConfig.overlays)
            .map(function (id) { return ({ id: id, options: _this.layerConfig.overlays[id] }); })
            .map(function (_a) {
            var id = _a.id, options = _a.options;
            return _this._createLayer(id, options, false);
        });
        overlays.forEach(function (layer) { return _this.map.addLayer(layer); });
    };
    BaseMap.prototype._createLayer = function (id, layerOptions, isBaseLayer) {
        if (isBaseLayer === void 0) { isBaseLayer = false; }
        var layer;
        if (layerOptions.type === layerConfig_enums_1.LayerType.GRB || layerOptions.type === layerConfig_enums_1.LayerType.DHMV || layerOptions.type === layerConfig_enums_1.LayerType.OMWRGBMRVL)
            layer = this._createGrbLayer(id, layerOptions.type);
        else if (layerOptions.type === layerConfig_enums_1.LayerType.GrbWMS)
            layer = this._createGrbWMSLayer(layerOptions);
        else if (layerOptions.type === layerConfig_enums_1.LayerType.ErfgoedWms)
            layer = this._createErfgoedWMSLayer(layerOptions.wmsLayers);
        else if (layerOptions.type === layerConfig_enums_1.LayerType.Ngi)
            layer = this._createNgiLayer(id);
        else if (layerOptions.type === layerConfig_enums_1.LayerType.Vector)
            layer = this._createVectorLayer(layerOptions);
        else
            throw new Error('Unknown layer type: ' + layerOptions.type);
        layer.set('title', layerOptions.title);
        layer.set('type', isBaseLayer ? 'base' : 'overlay');
        layer.set('layerType', layerOptions.type);
        layer.setVisible(!!layerOptions.visible);
        layer.set('showLegend', !!layerOptions.showLegend);
        return layer;
    };
    BaseMap.prototype._createGrbLayer = function (grbLayerId, type) {
        var resolutions = [];
        var matrixIds = [];
        var maxResolution = openlayers_1.default.extent.getWidth(this.mapProjection.getExtent()) / 256;
        var origin = openlayers_1.default.extent.getTopLeft(this.mapProjection.getExtent());
        for (var i = 0; i < 16; i++) {
            matrixIds[i] = i.toString();
            resolutions[i] = maxResolution / Math.pow(2, i);
        }
        return new openlayers_1.default.layer.Tile({
            source: new openlayers_1.default.source.WMTS({
                url: '//geo.api.vlaanderen.be/' + type + '/wmts',
                layer: grbLayerId,
                matrixSet: 'BPL72VL',
                format: 'image/png',
                projection: this.mapProjection,
                style: '',
                tileGrid: new openlayers_1.default.tilegrid.WMTS({ origin: origin, resolutions: resolutions, matrixIds: matrixIds }),
                attributions: '© <a href="https://www.vlaanderen.be/digitaal-vlaanderen" target="_blank" ' +
                    'title="Informatie Vlaanderen" class="copyrightLink">Digitaal Vlaanderen</a>'
            }),
            extent: this.mapProjection.getExtent()
        });
    };
    BaseMap.prototype._createNgiLayer = function (layerId) {
        var matrixIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        var resolutions = [1058.3333333327998, 529.1666666663999, 211.66666666656, 132.29166666659998, 66.14583333344,
            26.45833333332, 13.22916666666, 6.614583333344, 2.6458333333319994, 1.3229166666659997, 0.6614583333343999];
        var origin = [450000, 800000];
        return new openlayers_1.default.layer.Tile({
            source: new openlayers_1.default.source.WMTS({
                urls: ['https://cartoweb.wmts.ngi.be/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
                requestEncoding: 'REST',
                layer: layerId,
                matrixSet: '3812',
                format: 'image/png',
                projection: 'EPSG:3812',
                style: 'default',
                tileGrid: new openlayers_1.default.tilegrid.WMTS({ origin: origin, resolutions: resolutions, matrixIds: matrixIds }),
                attributions: '© <a href="https://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
                    'class="copyrightLink">NGI</a>'
            }),
            visible: false
        });
    };
    BaseMap.prototype._createWmsLegend = function (baseUrl, layer, layerOptions) {
        if (layerOptions.showLegend) {
            var layers = layerOptions.wmsLayers.split(' ');
            var legendItems = layers.map(function (layer) {
                return baseUrl +
                    '?REQUEST=GetLegendGraphic' +
                    '&VERSION=1.0.0&FORMAT=image/png' +
                    '&WIDTH=20&HEIGHT=20' +
                    '&LEGEND_OPTIONS=forceLabels:off;layout:horizontal;fontColor:ffffff' +
                    '&TRANSPARENT=true' +
                    '&LAYER=' + layer;
            });
            layer.set('legendItems', legendItems);
        }
    };
    BaseMap.prototype._createGrbWMSLayer = function (layerOptions) {
        var url = '//geo.api.vlaanderen.be/' + layerConfig_enums_1.LayerType.GRB + '/wms';
        var layer = new openlayers_1.default.layer.Tile({
            extent: this.mapProjection.getExtent(),
            source: new openlayers_1.default.source.TileWMS(({
                url: url,
                params: { LAYERS: layerOptions.wmsLayers, TILED: true },
                serverType: 'geoserver'
            })),
            maxResolution: 2000,
            visible: false
        });
        this._createWmsLegend(url, layer, layerOptions);
        return layer;
    };
    BaseMap.prototype._createErfgoedWMSLayer = function (wmsLayers) {
        return new openlayers_1.default.layer.Tile({
            extent: this.mapProjection.getExtent(),
            source: new openlayers_1.default.source.TileWMS(({
                url: this.serviceConfig.beschermingenWMSUrl || 'https://geo.onroerenderfgoed.be/geoserver/wms',
                params: { LAYERS: wmsLayers, TILED: true },
                serverType: 'geoserver',
                attributions: '© <a href="https://www.onroerenderfgoed.be">Onroerend Erfgoed</a>'
            })),
            maxResolution: 2000,
            visible: false
        });
    };
    BaseMap.prototype._createVectorLayer = function (options) {
        var existingLayer = this.map.getLayers().getArray().find(function (layer) { return layer.get('title') === options.title; });
        if (existingLayer) {
            this.map.removeLayer(existingLayer);
        }
        var vectorSource = new openlayers_1.default.source.Vector({});
        var textStyleFunction = function (feature) {
            var text = feature.get('name') ? feature.get('name') : '';
            return new openlayers_1.default.style.Text({
                font: '10px Verdana',
                text: text,
                fill: new openlayers_1.default.style.Fill({
                    color: options.style.stroke
                }),
                stroke: new openlayers_1.default.style.Stroke({
                    color: '#fff',
                    width: 3
                })
            });
        };
        var styleFunction = function (feature) {
            var styleText = textStyleFunction(feature);
            var style = new openlayers_1.default.style.Style({
                stroke: new openlayers_1.default.style.Stroke({
                    color: options.style.stroke,
                    width: 3
                }),
                fill: new openlayers_1.default.style.Fill({
                    color: options.style.fill
                }),
                text: styleText
            });
            return [style];
        };
        var vLayer = new openlayers_1.default.layer.Vector({
            source: vectorSource,
            style: styleFunction,
            visible: true
        });
        if (options.geometries) {
            options.geometries.forEach(function (geometry) {
                geometry.coordinates.forEach(function (coords) {
                    var geom = new openlayers_1.default.geom.Polygon(coords);
                    var feature = new openlayers_1.default.Feature(geom);
                    vectorSource.addFeature(feature);
                });
            });
        }
        vLayer.set('style', options.style);
        return vLayer;
    };
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], BaseMap.prototype, "serviceConfig", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], BaseMap.prototype, "buttonConfig", void 0);
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", Object)
    ], BaseMap.prototype, "layerConfig", void 0);
    BaseMap = __decorate([
        aurelia_framework_1.autoinject
    ], BaseMap);
    return BaseMap;
}());
exports.BaseMap = BaseMap;

//# sourceMappingURL=base-map.js.map
