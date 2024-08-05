import { refentielaagLayerConfig } from '../models/layerConfig.referentielaag';
var ZoneVergelijkingDialog = (function () {
    function ZoneVergelijkingDialog() {
        this.layerConfig = refentielaagLayerConfig;
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
    return ZoneVergelijkingDialog;
}());
export { ZoneVergelijkingDialog };

//# sourceMappingURL=zone-vergelijking-dialog.js.map
