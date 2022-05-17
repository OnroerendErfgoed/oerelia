var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as ol from 'openlayers';
var Geolocate = (function (_super) {
    __extends(Geolocate, _super);
    function Geolocate(optOptions) {
        var _this = _super.call(this, optOptions) || this;
        _this.addPositionFeatureCounter = 0;
        _this.options = optOptions || {};
        var tipLabel = _this.options.tipLabel ? _this.options.tipLabel : 'Zoom naar je eigen locatie';
        _this.element = document.createElement('div');
        _this.element.className = 'ol-geolocate ol-control ol-unselectable';
        var button = document.createElement('button');
        button.setAttribute('title', tipLabel);
        button.innerHTML = '<i class="fa fa-map-marker"></i>';
        _this.element.appendChild(button);
        button.addEventListener('click', _this._zoomToLocation.bind(_this), false);
        ol.control.Control.call(_this, {
            element: _this.element,
            target: _this.options.target
        });
        return _this;
    }
    Geolocate.prototype._zoomToLocation = function () {
        this.addPositionFeatureCounter = 0;
        var map = this.getMap();
        var view = map.getView();
        if (!this.layer) {
            this.layer = this._createLayer(map);
        }
        var source = this.layer.getSource();
        source.clear(true);
        var positionFeature = this._createFeature();
        var self = this;
        if (this.options.geolocateTracking) {
            navigator.geolocation.watchPosition(function (pos) {
                self._addPositionFeature(pos, view, source, positionFeature);
            }, function (error) {
                console.error(error);
            }, {
                enableHighAccuracy: true
            });
        }
        else {
            navigator.geolocation.getCurrentPosition(function (pos) {
                self._addPositionFeature(pos, view, source, positionFeature);
            });
        }
    };
    Geolocate.prototype._createLayer = function (map) {
        var source = new ol.source.Vector();
        var layer = new ol.layer.Vector({
            source: source
        });
        map.addLayer(layer);
        return layer;
    };
    Geolocate.prototype._createFeature = function () {
        var feature = new ol.Feature();
        feature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        }));
        return feature;
    };
    Geolocate.prototype._addPositionFeature = function (pos, view, source, positionFeature) {
        this.addPositionFeatureCounter++;
        var zoomLevel = this.options.zoomLevel ? this.options.zoomLevel : 12;
        var coordinates = ol.proj.transform([pos.coords.longitude, pos.coords.latitude], 'EPSG:4326', view.getProjection());
        if (this.addPositionFeatureCounter < 3) {
            view.setCenter(coordinates);
            view.setZoom(zoomLevel);
        }
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
        source.clear(true);
        source.addFeatures([
            positionFeature
        ]);
    };
    return Geolocate;
}(ol.control.Control));
export { Geolocate };

//# sourceMappingURL=ol-geolocate.js.map
