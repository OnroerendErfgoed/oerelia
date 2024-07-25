"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refentielaagLayerConfig = void 0;
var layerConfig_enums_1 = require("./layerConfig.enums");
exports.refentielaagLayerConfig = {
    baseLayers: {
        omwrgbmrvl: { type: layerConfig_enums_1.LayerType.OMWRGBMRVL, title: 'Ortho', visible: false },
        grb_bsk: { type: layerConfig_enums_1.LayerType.GRB, title: 'GRB-Basiskaart', visible: false },
        grb_bsk_grijs: { type: layerConfig_enums_1.LayerType.GRB, title: 'GRB-Basiskaart in grijswaarden', visible: true },
        topo: { type: layerConfig_enums_1.LayerType.Ngi, title: 'Topokaart', visible: false },
        DHMV_II_HILL_25cm: { type: layerConfig_enums_1.LayerType.DHMV, title: 'Hillshade 25cm', visible: false },
        DHMV_II_SVF_25cm: { type: layerConfig_enums_1.LayerType.DHMV, title: 'Skyview 25cm', visible: false }
    },
    overlays: {
        gebouwen: { type: layerConfig_enums_1.LayerType.GrbWMS, wmsLayers: 'GRB_GBG', title: 'GRB-Gebouwen', showLegend: true },
        percelen: { type: layerConfig_enums_1.LayerType.GrbWMS, wmsLayers: 'GRB_ADP_GRENS', title: 'GRB-Percelen', showLegend: true }
    }
};

//# sourceMappingURL=layerConfig.referentielaag.js.map
