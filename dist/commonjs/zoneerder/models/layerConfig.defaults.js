"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layerConfig_enums_1 = require("./layerConfig.enums");
exports.defaultLayerConfig = {
    baseLayers: [
        { type: layerConfig_enums_1.LayerType.Grb, id: 'omwrgbmrvl', title: 'Ortho', visible: false },
        { type: layerConfig_enums_1.LayerType.Grb, id: 'grb_bsk', title: 'GRB-Basiskaart', visible: false },
        { type: layerConfig_enums_1.LayerType.Grb, id: 'grb_bsk_grijs', title: 'GRB-Basiskaart in grijswaarden', visible: true },
        { type: layerConfig_enums_1.LayerType.Ngi, id: 'topo', title: 'Topokaart', visible: false },
        { type: layerConfig_enums_1.LayerType.Grb, id: 'DHMV_II_HILL_25cm', title: 'Hillshade 25cm', visible: false },
        { type: layerConfig_enums_1.LayerType.Grb, id: 'DHMV_II_SVF_25cm', title: 'Skyview 25cm', visible: false }
    ],
    overlays: [
        { type: layerConfig_enums_1.LayerType.Ngi, id: 'overlay', title: 'Topokaart overlay' },
        { type: layerConfig_enums_1.LayerType.GrbWMS, id: 'gebouwen', wmsLayers: 'GRB_GBG', title: 'GRB-Gebouwenlaag' },
        { type: layerConfig_enums_1.LayerType.GrbWMS, id: 'percelen', wmsLayers: 'GRB_ADP_GRENS', title: 'GRB-Percelenlaag' }
    ]
};

//# sourceMappingURL=layerConfig.defaults.js.map
