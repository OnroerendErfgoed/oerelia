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
import { LayerType } from '../models/layerConfig.enums';
var Layerswitcher = (function (_super) {
    __extends(Layerswitcher, _super);
    function Layerswitcher(optOptions) {
        var _this = _super.call(this, optOptions) || this;
        _this.isShown = false;
        _this.options = optOptions || {};
        _this.tipLabel = _this.options.tipLabel ?
            _this.options.tipLabel : 'Legend';
        _this.panelTitle = _this.options.title ?
            _this.options.title : 'Basic Layers';
        _this.mapListeners = [];
        _this.hiddenClassName = 'ol-unselectable ol-control layer-switcher';
        _this.shownClassName = _this.hiddenClassName + ' shown';
        _this.hiddenClassName = 'ol-unselectable ol-control layer-switcher';
        _this.shownClassName = _this.hiddenClassName + ' shown';
        _this.element = document.createElement('div');
        _this.element.className = _this.hiddenClassName;
        _this.button = document.createElement('button');
        _this.button.setAttribute('title', _this.tipLabel);
        _this.button.innerHTML = '<i class="fa fa-map"></i>';
        _this.element.appendChild(_this.button);
        _this.closeButton = document.createElement('button');
        _this.closeButton.setAttribute('title', 'Sluiten');
        _this.closeButton.style.display = 'none';
        _this.closeButton.innerHTML = '<i class="fa fa-remove"></i>';
        _this.element.appendChild(_this.closeButton);
        _this.panel = document.createElement('div');
        _this.panel.className = 'panel';
        _this.element.appendChild(_this.panel);
        var self = _this;
        _this.button.onclick = function () {
            self.showPanel();
            self.isShown = true;
            self.button.style.display = 'none';
            self.closeButton.style.display = 'inline-block';
        };
        _this.closeButton.onclick = function () {
            self.hidePanel();
            self.isShown = false;
            self.button.style.display = 'inline-block';
            self.closeButton.style.display = 'none';
        };
        ol.control.Control.call(_this, {
            element: _this.element,
            target: _this.options.target
        });
        return _this;
    }
    Layerswitcher.prototype.showPanel = function () {
        if (this.element.className !== this.shownClassName) {
            this.element.className = this.shownClassName;
            this.renderPanel();
        }
    };
    Layerswitcher.prototype.hidePanel = function () {
        if (this.element.className !== this.hiddenClassName) {
            this.element.className = this.hiddenClassName;
        }
    };
    Layerswitcher.prototype.renderPanel = function () {
        this.ensureTopVisibleBaseLayerShown_();
        while (this.panel.firstChild) {
            this.panel.removeChild(this.panel.firstChild);
        }
        var p = document.createElement('p');
        p.innerHTML = this.panelTitle;
        this.panel.appendChild(p);
        var ul = document.createElement('ul');
        this.panel.appendChild(ul);
        this.renderLayers_(this.getMap(), ul);
    };
    Layerswitcher.prototype.setMap = function (map) {
        var _this = this;
        for (var _i = 0, _a = this.mapListeners; _i < _a.length; _i++) {
            var mapListener = _a[_i];
            this.getMap().unset(mapListener);
        }
        this.mapListeners.length = 0;
        ol.control.Control.prototype.setMap.call(this, map);
        if (map) {
            this.mapListeners.push(map.on('pointerdown', function () {
                _this.hidePanel();
                _this.button.style.display = 'inline-block';
                _this.closeButton.style.display = 'none';
            }));
            this.renderPanel();
        }
    };
    Layerswitcher.prototype.ensureTopVisibleBaseLayerShown_ = function () {
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
    Layerswitcher.prototype.setVisible_ = function (lyr, visible) {
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
    Layerswitcher.prototype.renderLayer_ = function (lyr, idx) {
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
            label.htmlFor = lyrId;
            var title = document.createElement('span');
            title.innerHTML = lyrTitle;
            var row = document.createElement('div');
            row.className = 'row';
            row.appendChild(input);
            row.appendChild(label);
            li.appendChild(row);
            if (lyr.get('showLegend')) {
                this.addLegend(lyr, li, label);
            }
            label.appendChild(title);
        }
        return li;
    };
    Layerswitcher.prototype.addLegend = function (lyr, li, label) {
        var legendDiv = document.createElement('div');
        if (lyr.get('layerType') === LayerType.Vector) {
            legendDiv.style.backgroundColor = 'white';
            legendDiv.style.width = '14px';
            legendDiv.style.height = '14px';
            legendDiv.style.display = 'inline-block';
            legendDiv.style.verticalAlign = 'sub';
            legendDiv.style.marginRight = '4px';
            var legendGraphic = document.createElement('div');
            var style = lyr.get('style');
            var fill = style.fill;
            var stroke = style.stroke;
            legendGraphic.style.backgroundColor = fill;
            legendGraphic.style.border = '1px solid ' + stroke;
            legendGraphic.style.height = '100%';
            legendDiv.appendChild(legendGraphic);
            label.appendChild(legendDiv);
        }
        else if (lyr.get('legendItems')) {
            var legendRow = document.createElement('div');
            legendRow.className = 'row';
            legendDiv.className = 'large-12 column';
            for (var _i = 0, _a = lyr.get('legendItems'); _i < _a.length; _i++) {
                var legendUrl = _a[_i];
                var legendImage = document.createElement('img');
                legendImage.src = legendUrl;
                legendImage.style.marginLeft = '9px';
                legendDiv.style.width = '50%';
                legendDiv.appendChild(legendImage);
            }
            var legendSpan = document.createElement('span');
            legendSpan.appendChild(legendDiv);
            legendRow.appendChild(legendSpan);
            li.appendChild(legendRow);
        }
    };
    Layerswitcher.prototype.renderLayers_ = function (lyr, elm) {
        var lyrs = lyr.getLayers().getArray().slice().reverse();
        for (var i = 0, l = void 0; i < lyrs.length; i++) {
            l = lyrs[i];
            if (l.get('title')) {
                elm.appendChild(this.renderLayer_(l, i));
            }
        }
    };
    Layerswitcher.prototype.forEachRecursive = function (lyr, fn) {
        var _this = this;
        lyr.getLayers().forEach(function (lyr2, idx, a) {
            fn(lyr2, idx, a);
            if (lyr2.getLayers) {
                _this.forEachRecursive(lyr2, fn);
            }
        }, this);
    };
    return Layerswitcher;
}(ol.control.Control));
export { Layerswitcher };

//# sourceMappingURL=ol-layerswitcher.js.map
