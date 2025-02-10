import { LayerType } from './layerConfig.enums';
export var defaultLayerConfig = {
    baseLayers: {
        omwrgbmrvl: { type: LayerType.OMWRGBMRVL, title: 'Ortho', visible: false },
        grb_bsk: { type: LayerType.GRB, title: 'GRB-Basiskaart', visible: false },
        grb_bsk_grijs: { type: LayerType.GRB, title: 'GRB-Basiskaart in grijswaarden', visible: true },
        topo: { type: LayerType.Ngi, title: 'Topokaart', visible: false },
        DHMV_II_HILL_25cm: { type: LayerType.DHMV, title: 'Hillshade 25cm', visible: false },
        DHMV_II_SVF_25cm: { type: LayerType.DHMV, title: 'Skyview 25cm', visible: false }
    },
    overlays: {
        overlay: { type: LayerType.Ngi, title: 'Topokaart overlay' },
        kunstwerken: { type: LayerType.Kunstwerk, wmsLayers: 'GRB_KNW', title: 'GRB - KNW - kunstwerk', hidden: true },
        gebouwen: { type: LayerType.GrbWMS, wmsLayers: 'GRB_GBG', title: 'GRB-Gebouwenlaag' },
        percelen: { type: LayerType.GrbWMS, wmsLayers: 'GRB_ADP_GRENS', title: 'GRB-Percelenlaag' },
        bes: {
            type: LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:bes_landschap,' +
                'vioe_geoportaal:bes_sd_gezicht,' +
                'vioe_geoportaal:bes_arch_site,' +
                'vioe_geoportaal:bes_monument,' +
                'vioe_geoportaal:bes_overgangszone,' +
                'vioe_geoportaal:erfgoedls',
            title: 'Beschermd Onroerend Erfgoed'
        },
        gga: {
            type: LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:gga_gewestelijk,vioe_geoportaal:gga_gemeentelijk',
            title: 'Gebieden geen archeologie'
        },
        vast: {
            type: LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:vast_la',
            title: 'Vastgesteld landschapsrelict',
            visible: false
        },
        UNESCO: {
            type: LayerType.ErfgoedWms,
            wmsLayers: 'vioe_geoportaal:unesco_kern,' +
                'vioe_geoportaal:unesco_buffer',
            title: 'UNESCO',
            visible: false
        }
    }
};

//# sourceMappingURL=layerConfig.defaults.js.map
