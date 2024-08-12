"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneVergelijkingDialog = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_dialog_1 = require("aurelia-dialog");
var layerConfig_referentielaag_1 = require("../models/layerConfig.referentielaag");
var ZoneVergelijkingDialog = (function () {
    function ZoneVergelijkingDialog(controller) {
        this.controller = controller;
        this.layerConfig = layerConfig_referentielaag_1.refentielaagLayerConfig;
    }
    ZoneVergelijkingDialog.prototype.activate = function (model) {
        this.zone = model.zone;
        this.buttonConfig = {
            zoomFullExtent: true,
            fullscreen: true,
            zoomGeoLocation: false,
            rotate: false,
            zoomSwitcher: false,
            zoomInOut: true,
        };
        this.alignGrb = model.alignGrb;
    };
    ZoneVergelijkingDialog.prototype.neemResultaatOverVanZone = function () {
        this.controller.ok(this.resultaat);
    };
    ZoneVergelijkingDialog = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_dialog_1.DialogController])
    ], ZoneVergelijkingDialog);
    return ZoneVergelijkingDialog;
}());
exports.ZoneVergelijkingDialog = ZoneVergelijkingDialog;

//# sourceMappingURL=zone-vergelijking-dialog.js.map
