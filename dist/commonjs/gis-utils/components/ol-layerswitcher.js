"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerswitcherPanel = exports.Layerswitcher = void 0;
var ol = require("openlayers");
var Layerswitcher = (function (_super) {
    __extends(Layerswitcher, _super);
    function Layerswitcher(optOptions) {
        var _this = _super.call(this, optOptions) || this;
        _this.options = optOptions || {};
        _this.tipLabel = _this.options.tipLabel ? _this.options.tipLabel : 'Legend';
        _this.panel = _this.options.panel ? _this.options.panel : {};
        _this.element = document.createElement('div');
        _this.element.className = 'ol-unselectable button-container ol-control layer-switcher';
        _this.openButton = document.createElement('button');
        _this.openButton.setAttribute('title', _this.tipLabel);
        _this.openButton.className = 'open-button';
        _this.openButton.innerHTML = '<i class="fa fa-map"></i>';
        _this.element.appendChild(_this.openButton);
        _this.panel.openButton = _this.openButton;
        _this.openButton.onclick = function () {
            if (_this.openButton.classList.contains('selected')) {
                _this.hide();
            }
            else {
                _this.show();
            }
        };
        ol.control.Control.call(_this, {
            element: _this.element,
            target: _this.options.target
        });
        return _this;
    }
    Layerswitcher.prototype.show = function () {
        this.panel.show();
        this.openButton.classList.add('selected');
    };
    Layerswitcher.prototype.hide = function () {
        this.panel.hide();
        this.openButton.classList.remove('selected');
    };
    return Layerswitcher;
}(ol.control.Control));
exports.Layerswitcher = Layerswitcher;
var LayerswitcherPanel = (function (_super) {
    __extends(LayerswitcherPanel, _super);
    function LayerswitcherPanel(optOptions) {
        var _this = _super.call(this, optOptions) || this;
        _this.mapListeners = [];
        _this.options = optOptions || {};
        _this.panelTitle = _this.options.title ? _this.options.title : 'Legende';
        _this.element = document.createElement('div');
        _this.element.className = 'ol-unselectable panel-container ol-control layer-switcher hide';
        ol.control.Control.call(_this, {
            element: _this.element,
            target: _this.options.target
        });
        return _this;
    }
    LayerswitcherPanel.prototype.show = function () {
        this.element.classList.remove('hide');
        this.renderPanel();
    };
    LayerswitcherPanel.prototype.hide = function () {
        this.element.classList.add('hide');
    };
    LayerswitcherPanel.prototype.renderPanel = function () {
        var _this = this;
        this.ensureTopVisibleBaseLayerShown_();
        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
        var panelTitle = document.createElement('h5');
        panelTitle.className = 'pane-title';
        panelTitle.innerHTML = this.panelTitle;
        this.element.appendChild(panelTitle);
        this.closeButton = document.createElement('button');
        this.closeButton.setAttribute('title', 'Sluiten');
        this.closeButton.className = 'close-button';
        this.closeButton.innerHTML = '<i class="fa fa-remove"></i>';
        this.element.appendChild(this.closeButton);
        this.closeButton.onclick = function () {
            _this.hide();
            _this.openButton.classList.remove('selected');
        };
        this.element.appendChild(document.createElement('hr'));
        var ul = document.createElement('ul');
        this.element.appendChild(ul);
        this.renderLayers_(this.getMap(), ul);
    };
    LayerswitcherPanel.prototype.setMap = function (map) {
        var _this = this;
        for (var _i = 0, _a = this.mapListeners; _i < _a.length; _i++) {
            var mapListener = _a[_i];
            this.getMap().unset(mapListener);
        }
        this.mapListeners.length = 0;
        ol.control.Control.prototype.setMap.call(this, map);
        if (map) {
            this.mapListeners.push(map.on('pointerdown', function () {
                _this.hide();
                _this.openButton.classList.remove('selected');
            }));
            this.renderPanel();
        }
    };
    LayerswitcherPanel.prototype.ensureTopVisibleBaseLayerShown_ = function () {
        var lastVisibleBaseLyr;
        this.forEachRecursive(this.getMap(), function (l) {
            if (l.get('type') === 'base' && l.getVisible()) {
                lastVisibleBaseLyr = l;
            }
        });
        if (lastVisibleBaseLyr) {
            this.setVisible_(lastVisibleBaseLyr, true);
        }
    };
    LayerswitcherPanel.prototype.setVisible_ = function (lyr, visible) {
        var map = this.getMap();
        lyr.setVisible(visible);
        if (visible && lyr.get('type') === 'base') {
            this.forEachRecursive(map, function (l) {
                if (l !== lyr && l.get('type') === 'base') {
                    l.setVisible(false);
                }
            });
        }
    };
    LayerswitcherPanel.prototype.renderLayer_ = function (lyr, idx) {
        var self = this;
        var li = document.createElement('li');
        var lyrTitle = lyr.get('title');
        var lyrId = lyr.get('title').replace(' ', '-') + '_' + idx;
        var label = document.createElement('label');
        if (lyr.getLayers) {
            li.className = 'group';
            label.innerHTML = lyrTitle;
            li.appendChild(label);
            var ul = document.createElement('ul');
            li.appendChild(ul);
            this.renderLayers_(lyr, ul);
        }
        else {
            var input = document.createElement('input');
            if (lyr.get('type') === 'base') {
                input.type = 'radio';
                input.name = 'base';
            }
            else {
                input.type = 'checkbox';
            }
            input.id = lyrId;
            input.checked = lyr.get('visible');
            input.onchange = function (e) {
                var check = 'checked';
                self.setVisible_(lyr, e.target[check]);
            };
            li.appendChild(input);
            label.htmlFor = lyrId;
            label.innerHTML = lyrTitle;
            li.appendChild(label);
            var legendImages = lyr.get('legendImages');
            if (legendImages && legendImages.length > 0) {
                var container_1 = document.createElement('container');
                container_1.className = 'legend-container';
                legendImages.forEach(function (legendImage) {
                    var span = document.createElement('span');
                    span.className = 'legend-layer';
                    var image = document.createElement('img');
                    image.className = 'legend-image';
                    image.src = legendImage.url;
                    span.appendChild(image);
                    var titleLabel = document.createElement('label');
                    titleLabel.innerHTML = legendImage.title;
                    span.appendChild(titleLabel);
                    container_1.appendChild(span);
                });
                li.appendChild(container_1);
            }
        }
        return li;
    };
    LayerswitcherPanel.prototype.renderLayers_ = function (lyr, elm) {
        var lyrs = lyr.getLayers().getArray().slice().reverse();
        for (var i = 0, l = void 0; i < lyrs.length; i++) {
            l = lyrs[i];
            if (l.get('title')) {
                elm.appendChild(this.renderLayer_(l, i));
            }
        }
    };
    LayerswitcherPanel.prototype.forEachRecursive = function (lyr, fn) {
        var _this = this;
        lyr.getLayers().forEach(function (lyr2, idx, a) {
            fn(lyr2, idx, a);
            if (lyr2.getLayers) {
                _this.forEachRecursive(lyr2, fn);
            }
        }, this);
    };
    return LayerswitcherPanel;
}(ol.control.Control));
exports.LayerswitcherPanel = LayerswitcherPanel;

//# sourceMappingURL=ol-layerswitcher.js.map
