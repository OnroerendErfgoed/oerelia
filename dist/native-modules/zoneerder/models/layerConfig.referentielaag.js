import { LayerType } from './layerConfig.enums';
export var refentielaagLayerConfig = {
    baseLayers: {
        omwrgbmrvl: { type: LayerType.OMWRGBMRVL, title: 'Ortho', visible: false },
        grb_bsk: { type: LayerType.GRB, title: 'GRB-Basiskaart', visible: false },
        grb_bsk_grijs: { type: LayerType.GRB, title: 'GRB-Basiskaart in grijswaarden', visible: true },
        topo: { type: LayerType.Ngi, title: 'Topokaart', visible: false },
        DHMV_II_HILL_25cm: { type: LayerType.DHMV, title: 'Hillshade 25cm', visible: false },
        DHMV_II_SVF_25cm: { type: LayerType.DHMV, title: 'Skyview 25cm', visible: false }
    },
    overlays: {
        gebouwen: { type: LayerType.GrbWMS, wmsLayers: 'GRB_GBG', title: 'GRB-Gebouwen', className: 'grb-legende-gebouw' },
        percelen: { type: LayerType.GrbWMS, wmsLayers: 'GRB_ADP_GRENS', title: 'GRB-Percelen', className: 'grb-legende-perceel'
        }
    }
};

//# sourceMappingURL=layerConfig.referentielaag.js.map
