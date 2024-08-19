var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';
var ZoneVergelijkingDialog = (function () {
    function ZoneVergelijkingDialog(controller) {
        this.controller = controller;
        this.layerConfig = refentielaagLayerConfig;
    }
    ZoneVergelijkingDialog.prototype.activate = function (model) {
        var _this = this;
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
        var originalLaatstGealigneerd = model.laatstGealigneerd;
        setTimeout(function () {
            _this.laatstGealigneerd = originalLaatstGealigneerd;
        });
    };
    ZoneVergelijkingDialog.prototype.neemResultaatOverVanZone = function () {
        void this.controller.ok({ resultaat: this.resultaat, laatstGealigneerd: this.laatstGealigneerd });
    };
    ZoneVergelijkingDialog = __decorate([
        autoinject,
        __metadata("design:paramtypes", [DialogController])
    ], ZoneVergelijkingDialog);
    return ZoneVergelijkingDialog;
}());
export { ZoneVergelijkingDialog };

//# sourceMappingURL=zone-vergelijking-dialog.js.map
