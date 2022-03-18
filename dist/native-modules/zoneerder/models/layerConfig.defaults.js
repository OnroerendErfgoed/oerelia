import { LayerType } from './layerConfig.enums';
export var defaultLayerConfig = {
    baseLayers: [
        { type: LayerType.Grb, id: 'omwrgbmrvl', title: 'Ortho', visible: false },
        { type: LayerType.Grb, id: 'grb_bsk', title: 'GRB-Basiskaart', visible: false },
        { type: LayerType.Grb, id: 'grb_bsk_grijs', title: 'GRB-Basiskaart in grijswaarden', visible: true },
        { type: LayerType.Ngi, id: 'topo', title: 'Topokaart', visible: false },
        { type: LayerType.Grb, id: 'DHMV_II_HILL_25cm', title: 'Hillshade 25cm', visible: false },
        { type: LayerType.Grb, id: 'DHMV_II_SVF_25cm', title: 'Skyview 25cm', visible: false }
    ],
    overlays: [
        { type: LayerType.Ngi, id: 'overlay', title: 'Topokaart overlay' },
        { type: LayerType.GrbWMS, id: 'gebouwen', wmsLayers: 'GRB_GBG', title: 'GRB-Gebouwenlaag' },
        { type: LayerType.GrbWMS, id: 'percelen', wmsLayers: 'GRB_ADP_GRENS', title: 'GRB-Percelenlaag' }
    ]
};

//# sourceMappingURL=layerConfig.defaults.js.map
