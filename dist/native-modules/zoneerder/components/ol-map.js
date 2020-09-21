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
import { ButtonConfig } from '../models/buttonConfig';
import { GeozoekdienstApiService } from '../../services/geozoekdienst.api-service';
import { Layerswitcher } from './ol-layerswitcher';
import { CrabService } from '../../services/crab.api-service';
var OlMap = (function () {
    function OlMap(element, crabService) {
        this.element = element;
        this.crabService = crabService;
        this.geometryObjectList = [];
        this.isCollapsed = true;
        this.isDrawing = false;
        this.isDrawingCircle = false;
        this.selectPerceel = false;
        this.extentVlaanderen = [9928.0, 66928.0, 272072.0, 329072.0];
        this.initialized = false;
        this.polygonIndex = 1;
        this.circleIndex = 1;
        console.debug('olMap::constructor', this.zone);
        this._defineProjections();
    }
    OlMap.prototype.attached = function () {
        var _this = this;
        console.debug('olMap::attached', this.zone);
        this._createMap();
        this._createMapButtons();
        this._createLayers();
        this._createInteractions('Polygon', false);
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
            this.geometryObjectList.push('Zone');
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
            console.debug('Perceelselect', evt);
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
        var _this = this;
        console.log('name: ' + name);
        var coordinates = [];
        this.drawLayer.getSource().getFeatures().forEach(function (f) {
            if (f.getProperties().name === name) {
                console.log('name equal');
                _this.drawLayer.getSource().removeFeature(f);
            }
            else {
                console.log('not equal');
                var geometry = f.getProperties().name.includes('Cirkel') ? ol.geom.Polygon.fromCircle(f.getGeometry())
                    : f.getGeometry();
                coordinates.push(geometry.getCoordinates());
                console.log('coordinates: ' + JSON.stringify(coordinates));
            }
        });
        if (coordinates.length > 0) {
            console.log('length greater than 0');
            this.deleteCoordinateFromZone(coordinates);
        }
        else {
            console.log('length smaller than 0');
            this.zone.coordinates.splice(0, this.zone.coordinates.length);
        }
        console.log('list: ' + JSON.stringify(this.geometryObjectList));
        this.geometryObjectList.splice(this.geometryObjectList.indexOf(name), 1);
        console.log('objectList: ' + JSON.stringify(this.geometryObjectList));
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
        var coordinates = this.transformLabert72ToWebMercator(center);
        window.open(oeAppConfig.crabpyUrl + '/#zoom=' + zoom * 2 + '&lat=' + coordinates[1] + '&lon=' + coordinates[0]);
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
            else if (geom instanceof ol.geom.Circle) {
                multiPolygon.appendPolygon(ol.geom.Polygon.fromCircle(geom));
            }
        });
        var contour = this.formatGeoJson(multiPolygon);
        this.zone ? this.zone.coordinates.push(contour.coordinates[contour.coordinates.length - 1])
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
        console.debug('olMap::_createInteractions');
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
    OlMap.prototype._createMapButtons = function () {
        var buttonHeight = 2.2;
        var target = this.map.getTargetElement();
        var top = 2.4;
        if (!this.buttonConfig) {
            var className_1 = 'zoom';
            var style_1 = this.getButtonStyle(top);
            this.addZoomButton(className_1);
            this.setStyleToButton(target, className_1, style_1);
            top += 3.8;
            className_1 = 'layer-switcher';
            style_1 = this.getButtonStyle(top);
            this.setStyleToButton(target, className_1, style_1);
            return;
        }
        if (this.buttonConfig.fullscreen) {
            var className_2 = 'full-screen';
            var style_2 = this.getButtonStyle(top);
            this.addFullscreenButton(className_2);
            this.setStyleToButton(target, className_2, style_2);
            top += buttonHeight;
        }
        if (this.buttonConfig.zoomInOut) {
            var className_3 = 'zoom';
            var style_3 = this.getButtonStyle(top);
            this.addZoomButton(className_3);
            this.setStyleToButton(target, className_3, style_3);
            top += 3.8;
        }
        var className = 'layer-switcher';
        var style = this.getButtonStyle(top);
        this.setStyleToButton(target, className, style);
        top += buttonHeight;
        if (this.buttonConfig.zoomFullExtent) {
            var className_4 = 'fullextent';
            var style_4 = this.getButtonStyle(top);
            this.addZoomToExtentButton(className_4);
            this.setStyleToButton(target, className_4, style_4);
            top += buttonHeight;
        }
        if (this.buttonConfig.zoomGeoLocation) {
            var className_5 = 'geolocation';
            var style_5 = this.getButtonStyle(top);
            this.setStyleToButton(target, className_5, style_5);
            top += buttonHeight;
        }
        if (this.buttonConfig.rotate) {
            var className_6 = 'rotate';
            var style_6 = this.getButtonStyle(top);
            this.addRotateButton(className_6);
            this.setStyleToButton(target, className_6, style_6);
            top += buttonHeight;
        }
        if (this.buttonConfig.zoomSwitcher) {
            var className_7 = 'zoom-switcher';
            var style_7 = this.getButtonStyle(top);
            this.setStyleToButton(target, className_7, style_7);
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
            tipLabel: "Draai de kaart naar het noorden",
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
    OlMap.prototype.transformLabert72ToWebMercator = function (center) {
        var point = new ol.geom.Point([center[0], center[1]]);
        var transFormedPoint = point.transform('EPSG:31370', 'EPSG:3857');
        return transFormedPoint.getCoordinates();
    };
    OlMap.prototype.deleteCoordinateFromZone = function (coordinates) {
        var _this = this;
        var hash = {};
        for (var i = 0; i < this.zone.coordinates.length; i += 1) {
            hash[this.zone.coordinates[i]] = i;
        }
        var indexes = [];
        coordinates.forEach(function (coordinate) {
            if (hash.hasOwnProperty(coordinate)) {
                indexes.push(hash[coordinate]);
            }
        });
        this.zone.coordinates.forEach(function (coordinate, index) {
            if (indexes.indexOf(index) <= -1) {
                _this.zone.coordinates.splice(index, 1);
            }
        });
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
    __decorate([
        bindable,
        __metadata("design:type", ButtonConfig)
    ], OlMap.prototype, "buttonConfig", void 0);
    OlMap = __decorate([
        inject(Element, CrabService),
        __metadata("design:paramtypes", [Element,
            CrabService])
    ], OlMap);
    return OlMap;
}());
export { OlMap };

//# sourceMappingURL=ol-map.js.map
