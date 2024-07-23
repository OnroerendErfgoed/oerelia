"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layerConfig_referentielaag_1 = require("../models/layerConfig.referentielaag");
var ZoneVergelijkingDialog = (function () {
    function ZoneVergelijkingDialog() {
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
    };
    return ZoneVergelijkingDialog;
}());
exports.ZoneVergelijkingDialog = ZoneVergelijkingDialog;

//# sourceMappingURL=zone-vergelijking-dialog.js.map
