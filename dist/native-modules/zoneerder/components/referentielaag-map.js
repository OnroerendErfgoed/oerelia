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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Contour } from '../models/contour';
import { BaseMap } from './base-map';
import { bindable } from 'aurelia-framework';
import { LayerType } from '../models/layerConfig.enums';
import { OeFullscreen } from './oe-fullscreen';
var ReferentieLaagMap = (function (_super) {
    __extends(ReferentieLaagMap, _super);
    function ReferentieLaagMap() {
        var _this = _super.call(this) || this;
        _this._defineProjections();
        return _this;
    }
    ReferentieLaagMap.prototype.attached = function () {
        this._createMap();
        this._createMapButtons();
        this._createLayers();
        var inputLayer = this._createLayer('input', {
            type: LayerType.Vector,
            title: 'Input/Afbakening',
            style: {
                stroke: 'rgb(39, 146, 195)',
                fill: 'rgba(39, 146, 195, 0.3)'
            },
            geometries: [this.zone],
            showLegend: true,
            visible: true
        });
        this.map.addLayer(inputLayer);
        this.zoomToExtent(this.geoJsonFormatter.readGeometry(this.zone).getExtent());
    };
    ReferentieLaagMap.prototype.createResultLayer = function (geometry) {
        var resultLayer = this._createLayer('input', {
            type: LayerType.Vector,
            title: 'Output/Resultaat',
            style: {
                stroke: 'rgb(0, 255, 0)',
                fill: 'rgba(255, 255, 255, 0.7)',
            },
            geometries: geometry['geometries'] || [geometry],
            showLegend: true,
            visible: true
        });
        this.map.addLayer(resultLayer);
        return resultLayer;
    };
    ReferentieLaagMap.prototype.createVerschilPlusLayer = function (geometry) {
        var verschilPlusLayer = this._createLayer('verschilPlus', {
            type: LayerType.Vector,
            title: 'Verschil +',
            style: {
                stroke: 'rgb(0, 0, 0, 0)',
                fill: 'rgba(0, 255, 0)',
                hashed: true,
            },
            geometries: geometry['geometries'] || [geometry],
            showLegend: true,
            visible: true
        });
        this.map.addLayer(verschilPlusLayer);
        return verschilPlusLayer;
    };
    ReferentieLaagMap.prototype.createVerschilMinLayer = function (geometry) {
        var verschilMinLayer = this._createLayer('verschilMin', {
            type: LayerType.Vector,
            title: 'Verschil -',
            style: {
                stroke: 'rgb(0, 0, 0, 0)',
                fill: 'rgba(255, 0, 0)',
                hashed: true,
            },
            geometries: geometry['geometries'] || [geometry],
            showLegend: true,
            visible: true
        });
        this.map.addLayer(verschilMinLayer);
        return verschilMinLayer;
    };
    ReferentieLaagMap.prototype.resultsUpdated = function (results) {
        if (!results) {
            this.map.removeLayer(this.resultLayer);
            this.map.removeLayer(this.verschilPlusLayer);
            this.map.removeLayer(this.verschilMinLayer);
            return;
        }
        this.resultaat = results['result'];
        this.resultLayer = this.createResultLayer(results['result']);
        this.verschilMinLayer = this.createVerschilMinLayer(results['result_diff_min']);
        this.verschilPlusLayer = this.createVerschilPlusLayer(results['result_diff_plus']);
    };
    ReferentieLaagMap.prototype.addFullscreenButton = function (className) {
        this.map.addControl(new OeFullscreen({
            tipLabel: 'Vergroot / verklein het scherm',
            className: className,
            label: '',
            source: this.map.getTargetElement().parentElement
        }));
    };
    __decorate([
        bindable,
        __metadata("design:type", String)
    ], ReferentieLaagMap.prototype, "laatstGealigneerd", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Contour)
    ], ReferentieLaagMap.prototype, "zone", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Function)
    ], ReferentieLaagMap.prototype, "alignGrb", void 0);
    __decorate([
        bindable,
        __metadata("design:type", Object)
    ], ReferentieLaagMap.prototype, "resultaat", void 0);
    return ReferentieLaagMap;
}(BaseMap));
export { ReferentieLaagMap };

//# sourceMappingURL=referentielaag-map.js.map
