"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ol = require("openlayers");
var ol_geolocate_1 = require("./components/ol-geolocate");
var ol_layerswitcher_1 = require("./components/ol-layerswitcher");
var MapConfig = (function () {
    function MapConfig(mapProjection, useGeolocate, useLayerswitcher, center, maxZoom, minZoom, zoom, geolocateZoom) {
        if (useGeolocate === void 0) { useGeolocate = true; }
        if (useLayerswitcher === void 0) { useLayerswitcher = false; }
        this.mapProjection = mapProjection;
        this.useGeolocate = useGeolocate;
        this.useLayerswitcher = useLayerswitcher;
        this.center = center;
        this.maxZoom = maxZoom;
        this.minZoom = minZoom;
        this.zoom = zoom;
        this.geolocateZoom = geolocateZoom;
    }
    return MapConfig;
}());
exports.MapConfig = MapConfig;
var MapUtil = (function () {
    function MapUtil() {
    }
    MapUtil.transformBoundingboxToMapExtent = function (boundingbox) {
        var lowerleft = this.transformLatLonToPoint(boundingbox.lowerleft.lat, boundingbox.lowerleft.lon);
        var upperright = this.transformLatLonToPoint(boundingbox.upperright.lat, boundingbox.upperright.lon);
        return [lowerleft.getCoordinates()[0], lowerleft.getCoordinates()[1],
            upperright.getCoordinates()[0], upperright.getCoordinates()[1]];
    };
    MapUtil.transformLatLonToPoint = function (lat, lon) {
        var point = new ol.geom.Point([lon, lat]);
        return point.transform('EPSG:4326', 'EPSG:31370');
    };
    MapUtil.createGrbLayer = function (grbLayerId, title, isBaseLayer, visible, mapProjection) {
        var resolutions = [];
        var matrixIds = [];
        var maxResolution = ol.extent.getWidth(mapProjection.getExtent()) / 256;
        for (var i = 0; i < 16; i++) {
            matrixIds[i] = i.toString();
            resolutions[i] = maxResolution / Math.pow(2, i);
        }
        var tileGrid = new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(mapProjection.getExtent()),
            resolutions: resolutions,
            matrixIds: matrixIds
        });
        var grbSource = new ol.source.WMTS({
            url: '//tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts/',
            layer: grbLayerId,
            matrixSet: 'BPL72VL',
            format: 'image/png',
            projection: mapProjection,
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
            extent: mapProjection.getExtent(),
            visible: visible
        });
        layer.set('title', title);
        layer.set('type', isBaseLayer ? 'base' : 'overlay');
        return layer;
    };
    MapUtil.createVectorLayer = function (options) {
        var vectorSource = new ol.source.Vector({});
        var textStyleFunction = function (feature, resolution) {
            var text = feature.get('name') ? feature.get('name') : '';
            if (options.maxLabelResolution && resolution > options.maxLabelResolution) {
                text = '';
            }
            return new ol.style.Text({
                font: '10px Verdana',
                text: feature.get('show') ? text : '',
                fill: new ol.style.Fill({
                    color: options.color
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 3
                })
            });
        };
        var styleFunction = function (feature, resolution) {
            var styleText = textStyleFunction(feature, resolution);
            var showFeature = feature.get('show');
            if (showFeature) {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: options.color,
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: options.fill
                    }),
                    text: styleText
                });
            }
            else {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0,0)',
                        width: 1
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0,0,0,0)'
                    }),
                    text: styleText
                });
            }
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
    MapUtil.createNgiLayer = function (layerId, title, isBaseLayer) {
        var matrixIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        var resolutions = [1058.3333333327998, 529.1666666663999, 211.66666666656, 132.29166666659998, 66.14583333344,
            26.45833333332, 13.22916666666, 6.614583333344, 2.6458333333319994, 1.3229166666659997, 0.6614583333343999];
        var tileGrid = new ol.tilegrid.WMTS({
            origin: [450000, 800000],
            resolutions: resolutions,
            matrixIds: matrixIds
        });
        var ngiSource = new ol.source.WMTS({
            urls: ['https://www.ngi.be/cartoweb/1.0.0/{layer}/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'],
            requestEncoding: 'REST',
            layer: layerId,
            matrixSet: '3812',
            format: 'image/png',
            projection: 'EPSG:3812',
            style: 'default',
            tileGrid: tileGrid,
            attributions: [
                new ol.Attribution({
                    html: '© <a href="https://www.ngi.be/" target="_blank" title="Nationaal Geografisch Instituut" ' +
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
    MapUtil.createGrbWMSLayer = function (wmsLayers, title, isBaseLayer, mapProjection) {
        var layer = new ol.layer.Tile({
            extent: mapProjection.getExtent(),
            source: new ol.source.TileWMS(({
                url: 'https://geoservices.informatievlaanderen.be/raadpleegdiensten/GRB/wms',
                params: { LAYERS: wmsLayers, TILED: true },
                serverType: 'geoserver'
            })),
            maxResolution: 2000,
            visible: true
        });
        layer.set('title', title);
        layer.set('type', isBaseLayer ? 'base' : 'overlay');
        return layer;
    };
    MapUtil.createMap = function (target, config) {
        var map = new ol.Map({
            layers: [],
            target: target,
            view: new ol.View({
                center: config.center || ol.extent.getCenter(config.mapProjection.getExtent()),
                projection: config.mapProjection,
                zoom: config.zoom || 2,
                maxZoom: config.maxZoom || 21,
                minZoom: config.minZoom || 1
            }),
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                }),
                rotate: false,
                zoom: true
            }),
            logo: false
        });
        map.addControl(new ol.control.ScaleLine());
        if (config.useGeolocate) {
            map.addControl(new ol_geolocate_1.Geolocate({ zoomLevel: config.geolocateZoom }));
        }
        if (config.useLayerswitcher) {
            var layerswitcherPanel = new ol_layerswitcher_1.LayerswitcherPanel({
                title: 'Legende'
            });
            map.addControl(new ol_layerswitcher_1.Layerswitcher({
                tipLabel: 'Verander de kaartlagen',
                title: 'Kaartlagen',
                panel: layerswitcherPanel
            }));
            map.addControl(layerswitcherPanel);
        }
        return map;
    };
    MapUtil.mergePolygons = function (features) {
        var parser = new jsts.io.OL3Parser();
        parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon, ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);
        var mergedJstsGeom;
        features.forEach(function (f) {
            var jstsGeom = parser.read(f.getGeometry());
            mergedJstsGeom = mergedJstsGeom ? mergedJstsGeom.union(jstsGeom) : jstsGeom;
        });
        if (mergedJstsGeom) {
            var polygon = parser.write(mergedJstsGeom);
            var coords = polygon.getType() === 'Polygon' ? [polygon.getCoordinates()] : polygon.getCoordinates();
            if (coords[0].length > 0) {
                return new ol.Feature({
                    geometry: new ol.geom.MultiPolygon(coords)
                });
            }
            else {
                return null;
            }
        }
    };
    MapUtil.intersectPolygons = function (polygon1, polygon2) {
        var parser = new jsts.io.OL3Parser();
        var writer = new jsts.io.GeoJSONWriter();
        parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon, ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon, ol.geom.GeometryCollection);
        var jstsGeom1 = parser.read(polygon1.getGeometry());
        var jstsGeom2 = parser.read(polygon2.getGeometry());
        var intersects = jstsGeom1.intersects(jstsGeom2);
        if (!intersects) {
            return null;
        }
        var jstsGeom = polygon2 ? jstsGeom1.intersection(jstsGeom2) : jstsGeom1;
        var buffered = jstsGeom.buffer(0);
        var polygon = writer.write(buffered);
        var coords = polygon.type === 'Polygon' ? [polygon.coordinates] : polygon.coordinates;
        if (coords[0].length > 0) {
            return new ol.Feature({
                geometry: new ol.geom.MultiPolygon(coords)
            });
        }
        else {
            return null;
        }
    };
    MapUtil.subtractPolygons = function (polygon1, polygon2) {
        var parser = new jsts.io.OL3Parser();
        parser.inject(ol.geom.Point, ol.geom.LineString, ol.geom.LinearRing, ol.geom.Polygon, ol.geom.MultiPoint, ol.geom.MultiLineString, ol.geom.MultiPolygon);
        var jstsGeom;
        if (!polygon2) {
            jstsGeom = parser.read(polygon1.getGeometry());
        }
        else {
            jstsGeom = (parser.read(polygon1.getGeometry())).difference(parser.read(polygon2.getGeometry()));
        }
        var polygon = parser.write(jstsGeom);
        var coords = polygon.getType() === 'Polygon' ? [polygon.getCoordinates()] : polygon.getCoordinates();
        if (coords[0].length > 0) {
            return new ol.Feature({
                geometry: new ol.geom.MultiPolygon(coords)
            });
        }
        else {
            return null;
        }
    };
    MapUtil.getContourFromFeature = function (feature) {
        var formatter = new ol.format.GeoJSON();
        var geojson = formatter.writeFeatureObject(feature, {
            dataProjection: 'EPSG:31370',
            featureProjection: 'EPSG:31370'
        });
        geojson.geometry.crs = {
            type: 'name',
            properties: {
                name: 'urn:ogc:def:crs:EPSG::31370'
            }
        };
        return geojson.geometry;
    };
    MapUtil.bufferZone = function (zone, buffer) {
        var parser = new jsts.io.OL3Parser(null, ol);
        try {
            var jstsGeom = parser.read(zone.getGeometry());
            var buffered = jstsGeom.buffer(buffer);
            zone.setGeometry(parser.write(buffered));
        }
        catch (e) {
            console.debug(e);
            return zone;
        }
        return zone;
    };
    return MapUtil;
}());
exports.MapUtil = MapUtil;

//# sourceMappingURL=map-util.js.map
