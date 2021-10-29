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
        var _this = this;
        console.debug('Geolocate::constructor', optOptions);
        _this = _super.call(this, optOptions) || this;
        _this.options = optOptions || {};
        var tipLabel = _this.options.tipLabel ? _this.options.tipLabel : 'Zoom naar je eigen locatie';
        _this.element = document.createElement('div');
        _this.element.className = 'ol-geolocate ol-control ol-unselectable';
        _this.button = document.createElement('button');
        _this.button.setAttribute('title', tipLabel);
        _this.element.className = 'ol-control';
        _this.button.innerHTML = '<i class="fa fa-map-marker"></i>';
        _this.element.appendChild(_this.button);
        _this.button.onclick = function () {
            console.debug('onclick');
        };
        ol.control.Control.call(_this, {
            element: _this.element,
            target: _this.options.target
        });
        return _this;
    }
    Geolocate.prototype.click = function () {
        console.debug('click');
        console.debug(this.getMap());
    };
    Geolocate.prototype._zoomToLocation = function () {
        var _this = this;
        if (!this.geolocation) {
            return;
        }
        var zoomLevel = this.options.zoomLevel;
        var map = this.getMap();
        var view = map.getView();
        this.geolocation.setTracking(true);
        this.geolocation.once('change:position', function () {
            var position = _this.geolocation.getPosition();
            view.setCenter(position);
            if (zoomLevel) {
                view.setZoom(zoomLevel);
            }
            _this.geolocation.setTracking(false);
            var marker = document.getElementById('marker');
            marker.classList.remove('hide');
            var overlayId = 'markerOverlay';
            var overlay = map.getOverlayById(overlayId);
            if (!overlay) {
                map.addOverlay(new ol.Overlay({
                    id: overlayId,
                    position: position,
                    positioning: 'center-center',
                    element: marker,
                    stopEvent: false
                }));
            }
            else {
                overlay.setPosition(position);
            }
        });
    };
    return Geolocate;
}(ol.control.Control));
export { Geolocate };

//# sourceMappingURL=ol-geolocate.js.map
