var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LogManager, autoinject, bindable } from 'aurelia-framework';
import ol from 'openlayers';
import proj4 from 'proj4';
import { LayerType } from '../models/layerConfig.enums';
import { Layerswitcher } from './ol-layerswitcher';
import { defaultButtonConfig } from '../models/buttonConfig.defaults';
import { defaultLayerConfig } from '../models/layerConfig.defaults';
var log = LogManager.getLogger('ol-map');
var BaseMap = (function () {
    function BaseMap() {
        this.extentVlaanderen = [9928.0, 66928.0, 272072.0, 329072.0];
        this.initialized = false;
    }
    BaseMap.prototype.bind = function () {
        this.buttonConfig = this.buttonConfig || defaultButtonConfig;
        this.layerConfig = this.layerConfig || defaultLayerConfig;
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
        var point = new ol.geom.Point([lon, lat]);
        return point.transform('EPSG:4326', 'EPSG:31370');
    };
    BaseMap.prototype.transformLambert72ToWebMercator = function (center) {
        var point = new ol.geom.Point([center[0], center[1]]);
        var transFormedPoint = point.transform('EPSG:31370', 'EPSG:3857');
        return transFormedPoint.getCoordinates();
    };
    BaseMap.prototype._createMap = function () {
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
        this.map.addControl(new ol.control.Zoom({
            zoomInTipLabel: 'Zoom in',
            zoomOutTipLabel: 'Zoom uit',
            className: className
        }));
    };
    BaseMap.prototype.addFullscreenButton = function (className) {
        this.map.addControl(new ol.control.FullScreen({
            tipLabel: 'Vergroot / verklein het scherm',
            className: className,
            label: ''
        }));
    };
    BaseMap.prototype.addZoomToExtentButton = function (className) {
        this.map.addControl(new ol.control.ZoomToExtent({
            extent: this.mapProjection.getExtent(),
            tipLabel: 'Zoom naar Vlaanderen',
            className: className,
            label: ''
        }));
    };
    BaseMap.prototype.addRotateButton = function (className) {
        this.map.addControl(new ol.control.Rotate({
            tipLabel: 'Draai de kaart naar het noorden',
            className: className
        }));
    };
    BaseMap.prototype._defineProjections = function () {
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
    BaseMap.prototype._createLayers = function () {
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
    };
    BaseMap.prototype._createLayer = function (id, layerOptions, isBaseLayer) {
        if (isBaseLayer === void 0) { isBaseLayer = false; }
        var layer;
        if (layerOptions.type === LayerType.GRB || layerOptions.type === LayerType.DHMV || layerOptions.type === LayerType.OMWRGBMRVL)
            layer = this._createGrbLayer(id, layerOptions.type);
        else if (layerOptions.type === LayerType.GrbWMS)
            layer = this._createGrbWMSLayer(layerOptions);
        else if (layerOptions.type === LayerType.ErfgoedWms)
            layer = this._createErfgoedWMSLayer(layerOptions.wmsLayers);
        else if (layerOptions.type === LayerType.Ngi)
            layer = this._createNgiLayer(id);
        else if (layerOptions.type === LayerType.Vector)
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
    BaseMap.prototype._createNgiLayer = function (layerId) {
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
    BaseMap.prototype._createWmsLegend = function (baseUrl, layer, layerOptions) {
        if (layerOptions.showLegend) {
            var layers = layerOptions.wmsLayers.split(' ');
            var legendItems = layers.map(function (layer) {
                return baseUrl +
                    '?REQUEST=GetLegendGraphic' +
                    '&VERSION=1.0.0&FORMAT=image/png' +
                    '&WIDTH=20&HEIGHT=20' +
                    '&LEGEND_OPTIONS=forceLabels:on;fontAntiAliasing:true;fontSize:10;fontColor:ffffff;' +
                    '&TRANSPARENT=true' +
                    '&LAYER=' + layer;
            });
            layer.set('legendItems', legendItems);
        }
    };
    BaseMap.prototype._createGrbWMSLayer = function (layerOptions) {
        var url = '//geo.api.vlaanderen.be/' + LayerType.GRB + '/wms';
        var layer = new ol.layer.Tile({
            extent: this.mapProjection.getExtent(),
            source: new ol.source.TileWMS(({
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
    BaseMap.prototype._createPattern = function (color) {
        var spacing = 10;
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = canvas.height = spacing;
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(spacing, spacing);
        context.moveTo(-spacing, 0);
        context.lineTo(0, spacing);
        context.moveTo(spacing, 0);
        context.lineTo(2 * spacing, spacing);
        context.stroke();
        return context.createPattern(canvas, 'repeat');
    };
    BaseMap.prototype._createVectorLayer = function (options) {
        var _this = this;
        var existingLayer = this.map.getLayers().getArray().find(function (layer) { return layer.get('title') === options.title; });
        if (existingLayer) {
            this.map.removeLayer(existingLayer);
        }
        var vectorSource = new ol.source.Vector({});
        var textStyleFunction = function (feature) {
            var text = feature.get('name') ? feature.get('name') : '';
            return new ol.style.Text({
                font: '10px Verdana',
                text: text,
                fill: new ol.style.Fill({
                    color: options.style.stroke
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                })
            });
        };
        var styleFunction = function (feature) {
            var styleText = textStyleFunction(feature);
            var fillColor = options.style.fill;
            if (options.style.hashed) {
                fillColor = _this._createPattern(options.style.fill);
            }
            var style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: options.style.stroke,
                    width: 3,
                    lineDash: options.style.lineDash
                }),
                fill: new ol.style.Fill({
                    color: fillColor
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
        if (options.geometries) {
            options.geometries.forEach(function (geometry) {
                geometry.coordinates.forEach(function (coords) {
                    var geom = new ol.geom.Polygon(coords);
                    var feature = new ol.Feature(geom);
                    vectorSource.addFeature(feature);
                });
            });
        }
        vLayer.set('style', options.style);
        return vLayer;
    };
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], BaseMap.prototype, "serviceConfig", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], BaseMap.prototype, "buttonConfig", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], BaseMap.prototype, "layerConfig", void 0);
    BaseMap = __decorate([
        autoinject
    ], BaseMap);
    return BaseMap;
}());
export { BaseMap };

//# sourceMappingURL=base-map.js.map
