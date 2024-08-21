var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as ol from 'openlayers';
var OeFullscreen = (function (_super) {
    __extends(OeFullscreen, _super);
    function OeFullscreen(optOptions) {
        var _this = _super.call(this, optOptions) || this;
        _this.watchId = null;
        _this.options = optOptions || {};
        var tipLabel = _this.options.tipLabel ? _this.options.tipLabel : 'Vergroot / verklein het scherm';
        var className = _this.options.className || 'full-screen';
        _this.element = document.createElement('div');
        _this.element.className = "".concat(className, " ol-control ol-unselectable");
        if (_this.options.source instanceof Element) {
            _this.source = _this.options.source;
        }
        else {
            _this.source = document.getElementById(_this.options.source);
        }
        var button = document.createElement('button');
        button.setAttribute('title', tipLabel);
        button.className = 'full-screen-false';
        button.addEventListener('click', _this.toggleFullscreen.bind(_this), false);
        _this.element.appendChild(button);
        ol.control.Control.call(_this, {
            element: _this.element,
            target: _this.options.target
        });
        return _this;
    }
    OeFullscreen.prototype.setMap = function (map) {
        _super.prototype.setMap.call(this, map);
        if (!this.fullscreenSupported()) {
            return;
        }
        var source = this.source || this.getMap().getTargetElement();
        source.addEventListener("fullscreenchange", this.handleFullscreenChange.bind(this));
    };
    OeFullscreen.prototype.isFullScreen = function () {
        return !!(document['webkitIsFullScreen'] || document['mozFullScreen'] ||
            document['msFullscreenElement'] || document.fullscreenElement);
    };
    OeFullscreen.prototype.handleFullscreenChange = function () {
        var button = this.element.firstElementChild;
        if (!this.isFullScreen()) {
            button.className = 'full-screen-false';
        }
        else if (button.className === 'full-screen-false') {
            button.className = 'full-screen-true';
        }
        else {
            button.className = 'full-screen-false';
        }
    };
    OeFullscreen.prototype.toggleFullscreen = function () {
        var button = this.element.firstElementChild;
        button.className === 'full-screen-false' ? this.openFullscreen() : this.closeFullscreen();
    };
    OeFullscreen.prototype.fullscreenSupported = function () {
        var body = document.body;
        return body['webkitRequestFullscreen'] ||
            (body['mozRequestFullScreen'] && document['mozFullScreenEnabled']) ||
            (body['msRequestFullscreen'] && document['msFullscreenEnabled']) ||
            (body.requestFullscreen && document.fullscreenEnabled);
    };
    OeFullscreen.prototype.openFullscreen = function () {
        var target = this.source || this.getMap().getTargetElement();
        if (target.requestFullscreen) {
            void target.requestFullscreen();
        }
        else if (target['webkitRequestFullscreen']) {
            target['webkitRequestFullscreen']();
        }
        else if (target['msRequestFullscreen']) {
            target['msRequestFullscreen']();
        }
    };
    OeFullscreen.prototype.closeFullscreen = function () {
        if (document.exitFullscreen) {
            void document.exitFullscreen();
        }
        else if (document['webkitExitFullscreen']) {
            document['webkitExitFullscreen']();
        }
        else if (document['msExitFullscreen']) {
            document['msExitFullscreen']();
        }
    };
    OeFullscreen.prototype.getChangeType = function () {
        if (this.changeType) {
            return this.changeType;
        }
        var body = document.body;
        if (body['webkitRequestFullscreen']) {
            this.changeType = 'webkitfullscreenchange';
        }
        else if (body['mozRequestFullScreen']) {
            this.changeType = 'mozfullscreenchange';
        }
        else if (body['msRequestFullscreen']) {
            this.changeType = 'MSFullscreenChange';
        }
        else if (body.requestFullscreen) {
            this.changeType = 'fullscreenchange';
        }
        return this.changeType;
    };
    return OeFullscreen;
}(ol.control.Control));
export { OeFullscreen };

//# sourceMappingURL=oe-fullscreen.js.map
