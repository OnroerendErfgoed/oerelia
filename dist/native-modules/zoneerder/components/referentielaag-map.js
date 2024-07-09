var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindable } from 'aurelia-framework';
import proj4 from 'proj4';
import ol from 'openlayers';
import { Layerswitcher } from './ol-layerswitcher';
import { LayerType } from '../models/layerConfig.enums';
import { Contour } from '../models/contour';
import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';
var ReferentieLaagMap = (function () {
    function ReferentieLaagMap() {
        this.extentVlaanderen = [9928.0, 66928.0, 272072.0, 329072.0];
        this.initialized = false;
        this._defineProjections();
    }
    ReferentieLaagMap.prototype.attached = function () {
        var _this = this;
        this._createMap();
        this._createMapButtons();
        this._createLayers();
        this.addZoneToDrawLayer();
        this.drawLayer.getSource().on('addfeature', function (feature) {
            _this.drawLayerToZone();
        });
    };
    ReferentieLaagMap.prototype.bind = function () {
        this.layerConfig = this.layerConfig || refentielaagLayerConfig;
    };
    ReferentieLaagMap.prototype._defineProjections = function () {
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
    ReferentieLaagMap.prototype._createMap = function () {
        var target = this.referentielaagNode;
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
    ReferentieLaagMap.prototype.updateMapSize = function () {
        this.map.updateSize();
    };
    ReferentieLaagMap.prototype._createLayers = function () {
        var _this = this;
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
            title: 'Input/afbakening',
        });
        this.map.addLayer(this.drawLayer);
    };
    ReferentieLaagMap.prototype._createLayer = function (id, layerOptions, isBaseLayer) {
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
        if (layerOptions.className) {
            layer.set('className', 'grb-legende-afbakening');
        }
        layer.setVisible(!!layerOptions.visible);
        return layer;
    };
    ReferentieLaagMap.prototype._createVectorLayer = function (options) {
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
            visible: true,
        });
        vLayer.set('title', options.title);
        vLayer.set('type', 'overlay');
        return vLayer;
    };
    ReferentieLaagMap.prototype._createGrbLayer = function (grbLayerId, type) {
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
    ReferentieLaagMap.prototype._createNgiLayer = function (layerId) {
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
    ReferentieLaagMap.prototype._createGrbWMSLayer = function (wmsLayers) {
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
    ReferentieLaagMap.prototype._createErfgoedWMSLayer = function (wmsLayers) {
        var service = this.serviceConfig ? this.serviceConfig.beschermingenWMSUrl || 'https://geo.onroerenderfgoed.be/geoserver/wms' : 'https://geo.onroerenderfgoed.be/geoserver/wms';
        return new ol.layer.Tile({
            extent: this.mapProjection.getExtent(),
            source: new ol.source.TileWMS(({
                url: service,
                params: { LAYERS: wmsLayers, TILED: true },
                serverType: 'geoserver',
                attributions: '© <a href="https://www.onroerenderfgoed.be">Onroerend Erfgoed</a>'
            })),
            maxResolution: 2000,
            visible: false
        });
    };
    ReferentieLaagMap.prototype.addZoneToDrawLayer = function () {
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
        this.zone.coordinates.forEach(function (coords) {
            var polygon = new ol.geom.Polygon(coords);
            var feature = new ol.Feature({
                name: 'Zone',
                geometry: polygon
            });
            drawSource.addFeature(feature);
        });
        this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
    };
    ReferentieLaagMap.prototype.drawLayerToZone = function () {
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
    ReferentieLaagMap.prototype._createMapButtons = function () {
        var buttonHeight = 2.2;
        var target = this.map.getTargetElement();
        var top = 0.8;
        this.addFullscreenButton('full-screen');
        this.setStyleToButton(target, 'full-screen', this.getButtonStyle(top));
        top += buttonHeight;
        this.addZoomButton('zoom');
        this.setStyleToButton(target, 'zoom', this.getButtonStyle(top));
        top += 3.8;
    };
    ReferentieLaagMap.prototype.getButtonStyle = function (top) {
        return 'top: ' + top + 'em; left: ' + .5 + 'em;';
    };
    ReferentieLaagMap.prototype.addFullscreenButton = function (className) {
        this.map.addControl(new ol.control.FullScreen({
            tipLabel: 'Vergroot / verklein het scherm',
            className: className,
            label: ''
        }));
    };
    ReferentieLaagMap.prototype.setStyleToButton = function (target, className, style) {
        target.getElementsByClassName(className)
            .item(0)
            .setAttribute('style', style);
    };
    ReferentieLaagMap.prototype.addZoomButton = function (className) {
        this.map.addControl(new ol.control.Zoom({
            zoomInTipLabel: 'Zoom in',
            zoomOutTipLabel: 'Zoom uit',
            className: className
        }));
    };
    ReferentieLaagMap.prototype.formatGeoJson = function (feature) {
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
    ReferentieLaagMap.prototype.zoomToExtent = function (extent) {
        this.updateMapSize();
        this.map.getView().fit(extent, { maxZoom: 14 });
    };
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], ReferentieLaagMap.prototype, "serviceConfig", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Contour)
    ], ReferentieLaagMap.prototype, "zone", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], ReferentieLaagMap.prototype, "layerConfig", void 0);
    return ReferentieLaagMap;
}());
export { ReferentieLaagMap };

//# sourceMappingURL=referentielaag-map.js.map
