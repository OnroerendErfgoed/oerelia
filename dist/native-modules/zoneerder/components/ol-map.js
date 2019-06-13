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
import { bindable, inject } from 'aurelia-framework';
import * as ol from 'openlayers';
import proj4 from 'proj4';
import * as toastr from 'toastr';
import { Contour } from '../models/contour';
import { GeozoekdienstApiService } from '../services/geozoekdienst.api-service';
import { Layerswitcher } from './ol-layerswitcher';
var OlMap = (function () {
    function OlMap(element) {
        this.element = element;
        this.polygonList = [];
        this.isDrawing = false;
        this.selectPerceel = false;
        this.extentVlaanderen = [9928.0, 66928.0, 272072.0, 329072.0];
        this.initialized = false;
        this.polygonIndex = 1;
        console.debug('olMap::constructor', this.zone);
        this._defineProjections();
    }
    OlMap.prototype.attached = function () {
        var _this = this;
        console.debug('olMap::attached', this.zone);
        this._createMap();
        this._createLayers();
        this._createInteractions();
        this.element.dispatchEvent(new CustomEvent('loaded', {
            bubbles: true
        }));
        if (this.zone) {
            this.zone.coordinates.forEach(function (coords) {
                var feature = new ol.Feature({
                    name: 'Zone',
                    geometry: new ol.geom.Polygon(coords)
                });
                _this.drawLayer.getSource().addFeature(feature);
            });
            this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
            this.polygonList.push('Zone');
        }
        this.drawLayer.getSource().on('addfeature', function (feature) {
            console.debug('olMap::drawLayer::addfeature', feature);
            _this.addToZone(feature);
        });
    };
    OlMap.prototype.updateMapSize = function () {
        console.debug('olMap::updateMapSize');
        this.map.updateSize();
    };
    OlMap.prototype.disabledChanged = function (newValue, oldValue) {
        console.debug('olMap::disabledChanged', newValue, oldValue);
        if (this.initialized) {
            this.updateMapSize();
        }
    };
    OlMap.prototype.setBaseLayer = function (layerName) {
        this.baseLayers.ortho.setVisible(layerName === 'ortho');
        this.baseLayers.grb.setVisible(layerName === 'grb');
        this.baseLayers.grbzw.setVisible(layerName === 'grbzw');
        this.baseLayers.topo.setVisible(layerName === 'topo');
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
    OlMap.prototype.startDrawZone = function () {
        var _this = this;
        this.toggleDrawZone(true);
        this.mapInteractions.drawZone.once('drawend', function (evt) {
            evt.feature.setProperties({ name: "Polygoon " + _this.polygonIndex++ });
            _this.polygonList.push(evt.feature.getProperties().name);
            _this.toggleDrawZone(false);
        });
    };
    OlMap.prototype.importAdrespunten = function () {
        var _this = this;
        if (this.adrespunten) {
            this.adrespunten.forEach(function (a) {
                _this.apiService.searchPerceel(a.coordinates[0], _this.mapProjection.getCode()).then(function (result) {
                    _this.geoJsonFormatter.readFeatures(result).forEach(function (perceel) {
                        var name = 'Adrespunten';
                        perceel.set('name', name);
                        _this.drawLayer.getSource().addFeature(perceel);
                        if (_this.polygonList.indexOf(name) === -1) {
                            _this.polygonList.push(name);
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
        this.resetSelect();
        this.selectPerceel = true;
        this.map.once('click', function (evt) {
            console.debug('Perceelselect', evt);
            _this.selectPerceel = false;
            _this.apiService.searchPerceel(evt.coordinate, _this.mapProjection.getCode()).then(function (result) {
                _this.geoJsonFormatter.readFeatures(result).forEach(function (perceel) { _this.drawPerceel(perceel); });
            });
        });
    };
    OlMap.prototype.drawPerceel = function (olFeature) {
        if (olFeature) {
            var name_1 = "Perceel " + olFeature.get('CAPAKEY');
            if (this.polygonList.indexOf(name_1) === -1) {
                olFeature.set('name', name_1);
                this.drawLayer.getSource().addFeature(olFeature);
                this.polygonList.push(name_1);
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
            this.polygonList.push(name_2);
            this.zoomToFeatures();
            this.WKTstring = '';
        }
        catch (error) {
            toastr.error(error, 'Dit is een ongeldige WKT geometrie.');
        }
    };
    OlMap.prototype.removePolygon = function (name) {
        var _this = this;
        var coordinates = [];
        this.drawLayer.getSource().getFeatures().forEach(function (f) {
            if (f.getProperties().name === name) {
                _this.drawLayer.getSource().removeFeature(f);
            }
            else {
                coordinates.push(f.getGeometry().getCoordinates());
            }
        });
        if (coordinates.length > 0) {
            var multiPolygon = new ol.geom.MultiPolygon(coordinates);
            this.zone = new Contour(this.formatGeoJson(multiPolygon));
        }
        else {
            this.zone = null;
        }
        this.polygonList.splice(this.polygonList.indexOf(name), 1);
    };
    OlMap.prototype.addToZone = function (olFeature) {
        console.debug('addToZone', olFeature);
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
        });
        this.zone = new Contour(this.formatGeoJson(multiPolygon));
    };
    OlMap.prototype.resetSelect = function () {
        this.selectPerceel = false;
        this.map.removeEventListener('click');
    };
    OlMap.prototype.toggleDrawZone = function (bool) {
        this.mapInteractions.drawZone.setActive(bool);
        this.isDrawing = bool;
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
                zoom: true
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
    OlMap.prototype._createInteractions = function () {
        console.debug('olMap::_createInteractions');
        var drawZoneInteraction = new ol.interaction.Draw({
            type: ('Polygon'),
            source: this.drawLayer.getSource(),
            freehand: false
        });
        this.map.addInteraction(drawZoneInteraction);
        drawZoneInteraction.setActive(false);
        this.mapInteractions = {
            drawZone: drawZoneInteraction
        };
    };
    OlMap.prototype._createLayers = function () {
        this.baseLayers = {};
        var layerGroup = new ol.layer.Group({
            layers: [
                this.baseLayers.ortho = this._createGrbLayer('omwrgbmrvl', 'Ortho', true),
                this.baseLayers.grb = this._createGrbLayer('grb_bsk', 'GRB-Basiskaart', true),
                this.baseLayers.grbzw = this._createGrbLayer('grb_bsk_grijs', 'GRB-Basiskaart in grijswaarden', true),
                this.baseLayers.topo = this._createNgiLayer('topo', 'Topokaart', true)
            ]
        });
        layerGroup.set('title', 'Achtergrond kaart');
        this.map.addLayer(layerGroup);
        this.setBaseLayer('grbzw');
        this.map.addLayer(this._createNgiLayer('overlay', 'Topokaart overlay', false));
        this.map.addLayer(this._createGrbWMSLayer('GRB_GBG', 'GRB-Gebouwenlaag', false));
        this.map.addLayer(this._createGrbWMSLayer('GRB_ADP_GRENS', 'GRB-Percelenlaag', false));
        this.drawLayer = this._createVectorLayer({
            color: 'rgb(39, 146, 195)',
            fill: 'rgba(39, 146, 195, 0.3)',
            title: 'Zone'
        });
        this.map.addLayer(this.drawLayer);
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
    OlMap.prototype._createGrbLayer = function (grbLayerId, title, isBaseLayer) {
        var resolutions = [];
        var matrixIds = [];
        var maxResolution = ol.extent.getWidth(this.mapProjection.getExtent()) / 256;
        for (var i = 0; i < 16; i++) {
            matrixIds[i] = i.toString();
            resolutions[i] = maxResolution / Math.pow(2, i);
        }
        var tileGrid = new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(this.mapProjection.getExtent()),
            resolutions: resolutions,
            matrixIds: matrixIds
        });
        var grbSource = new ol.source.WMTS({
            url: '//tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts/',
            layer: grbLayerId,
            matrixSet: 'BPL72VL',
            format: 'image/png',
            projection: this.mapProjection,
            style: '',
            tileGrid: tileGrid,
            attributions: [
                new ol.Attribution({
                    html: '© <a href="https://overheid.vlaanderen.be/informatie-vlaanderen" target="_blank" ' +
                        'title="Informatie Vlaanderen" class="copyrightLink">Informatie Vlaanderen</a>'
                })
            ]
        });
        var layer = new ol.layer.Tile({
            source: grbSource,
            extent: this.mapProjection.getExtent()
        });
        layer.set('title', title);
        layer.set('type', isBaseLayer ? 'base' : 'overlay');
        return layer;
    };
    OlMap.prototype._createNgiLayer = function (layerId, title, isBaseLayer) {
        var matrixIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        var resolutions = [1058.3333333327998, 529.1666666663999, 211.66666666656, 132.29166666659998, 66.14583333344,
            26.45833333332, 13.22916666666, 6.614583333344, 2.6458333333319994, 1.3229166666659997, 0.6614583333343999];
        var tileGrid = new ol.tilegrid.WMTS({
            origin: [450000, 800000],
            resolutions: resolutions,
            matrixIds: matrixIds
        });
        var ngiSource = new ol.source.WMTS({
            urls: ['http://www.ngi.be/cartoweb/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
            requestEncoding: 'REST',
            layer: layerId,
            matrixSet: '3812',
            format: 'image/png',
            projection: 'EPSG:3812',
            style: 'default',
            tileGrid: tileGrid,
            attributions: [
                new ol.Attribution({
                    html: '© <a href="http://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
                        'class="copyrightLink">NGI</a>'
                })
            ]
        });
        var layer = new ol.layer.Tile({
            source: ngiSource,
            visible: false
        });
        layer.set('title', title);
        layer.set('type', isBaseLayer ? 'base' : 'overlay');
        return layer;
    };
    OlMap.prototype._createGrbWMSLayer = function (wmsLayers, title, isBaseLayer) {
        var layer = new ol.layer.Tile({
            extent: this.mapProjection.getExtent(),
            source: new ol.source.TileWMS(({
                url: 'http://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB/wms',
                params: { LAYERS: wmsLayers, TILED: true },
                serverType: 'geoserver'
            })),
            maxResolution: 2000,
            visible: false
        });
        layer.set('title', title);
        layer.set('type', isBaseLayer ? 'base' : 'overlay');
        return layer;
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
    OlMap.prototype.strip = function (geom, test) {
        var _this = this;
        if (!geom.length) {
            return;
        }
        if (typeof geom[0] !== 'number') {
            return geom.map(function (g) { return _this.strip(g, test); });
        }
        return geom.filter(test);
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
        __metadata("design:type", GeozoekdienstApiService)
    ], OlMap.prototype, "apiService", void 0);
    OlMap = __decorate([
        inject(Element),
        __metadata("design:paramtypes", [Element])
    ], OlMap);
    return OlMap;
}());
export { OlMap };