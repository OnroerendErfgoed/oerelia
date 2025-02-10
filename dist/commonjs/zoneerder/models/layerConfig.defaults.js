"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLayerConfig = void 0;
var layerConfig_enums_1 = require("./layerConfig.enums");
exports.defaultLayerConfig = {
    baseLayers: {
        omwrgbmrvl: { type: layerConfig_enums_1.LayerType.OMWRGBMRVL, title: 'Ortho', visible: false },
        grb_bsk: { type: layerConfig_enums_1.LayerType.GRB, title: 'GRB-Basiskaart', visible: false },
        grb_bsk_grijs: { type: layerConfig_enums_1.LayerType.GRB, title: 'GRB-Basiskaart in grijswaarden', visible: true },
        topo: { type: layerConfig_enums_1.LayerType.Ngi, title: 'Topokaart', visible: false },
        DHMV_II_HILL_25cm: { type: layerConfig_enums_1.LayerType.DHMV, title: 'Hillshade 25cm', visible: false },
        DHMV_II_SVF_25cm: { type: layerConfig_enums_1.LayerType.DHMV, title: 'Skyview 25cm', visible: false }
    },
    overlays: {
        overlay: { type: layerConfig_enums_1.LayerType.Ngi, title: 'Topokaart overlay' },
        kunstwerken: { type: layerConfig_enums_1.LayerType.GrbWMS, wmsLayers: 'GRB_KNW', title: 'GRB-Kunstwerkenlaag', hidden: true },
        gebouwen: { type: layerConfig_enums_1.LayerType.GrbWMS, wmsLayers: 'GRB_GBG', title: 'GRB-Gebouwenlaag' },
        percelen: { type: layerConfig_enums_1.LayerType.GrbWMS, wmsLayers: 'GRB_ADP_GRENS', title: 'GRB-Percelenlaag' },
        bes: {
            type: layerConfig_enums_1.LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:bes_landschap,' +
                'vioe_geoportaal:bes_sd_gezicht,' +
                'vioe_geoportaal:bes_arch_site,' +
                'vioe_geoportaal:bes_monument,' +
                'vioe_geoportaal:bes_overgangszone,' +
                'vioe_geoportaal:erfgoedls',
            title: 'Beschermd Onroerend Erfgoed'
        },
        gga: {
            type: layerConfig_enums_1.LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:gga_gewestelijk,vioe_geoportaal:gga_gemeentelijk',
            title: 'Gebieden geen archeologie'
        },
        vast: {
            type: layerConfig_enums_1.LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:vast_la',
            title: 'Vastgesteld landschapsrelict',
            visible: false
        },
        UNESCO: {
            type: layerConfig_enums_1.LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:unesco_kern,' +
                'vioe_geoportaal:unesco_buffer',
            title: 'UNESCO',
            visible: false
        }
    }
};

//# sourceMappingURL=layerConfig.defaults.js.map
