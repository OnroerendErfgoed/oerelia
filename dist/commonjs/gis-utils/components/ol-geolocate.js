"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ol = require("openlayers");
var Geolocate = (function (_super) {
    __extends(Geolocate, _super);
    function Geolocate(optOptions) {
        var _this = this;
        console.debug('Geolocate::constructor', optOptions);
        _this = _super.call(this, optOptions) || this;
        _this.options = optOptions || {};
        var tipLabel = _this.options.tipLabel ? _this.options.tipLabel : 'Zoom naar je eigen locatie';
        _this.element = document.createElement('div');
        _this.element.className = 'ol-geolocate ol-control ol-unselectable';
        _this.button = document.createElement('button');
        _this.button.setAttribute('title', tipLabel);
        _this.button.innerHTML = '<i class="fa fa-map-marker"></i>';
        _this.element.appendChild(_this.button);
        _this.positionFeature = new ol.Feature();
        _this.positionFeature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC',
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2,
                }),
            }),
        }));
        _this.button.addEventListener('click', _this._zoomToLocation.bind(_this), false);
        ol.control.Control.call(_this, {
            element: _this.element,
            target: _this.options.target
        });
        var map = _this.getMap();
        var source = new ol.source.Vector();
        var layer = new ol.layer.Vector({
            source: source
        });
        map.addLayer(layer);
        return _this;
    }
    Geolocate.prototype._zoomToLocation = function () {
        console.debug('_zoomToLocation');
        navigator.geolocation.getCurrentPosition(function (pos) {
            console.debug('_zoomToLocation::getCurrentPosition');
        });
    };
    return Geolocate;
}(ol.control.Control));
exports.Geolocate = Geolocate;

//# sourceMappingURL=ol-geolocate.js.map
