import { LayerType } from './layerConfig.enums';
interface baseLayerOptions {
    type: LayerType;
    id: string;
    title: string;
    visible?: boolean;
    attributions?: string;
}
interface GrbOrNgiLayerOptions extends baseLayerOptions {
    type: LayerType.Ngi | LayerType.Grb;
}
export interface GrbWmsLayerOptions extends baseLayerOptions {
    type: LayerType.GrbWMS;
    wmsLayers: string;
}
export declare type GrbLayerOptions = GrbOrNgiLayerOptions;
export declare type NgiLayerOptions = GrbOrNgiLayerOptions;
export declare type LayerOptions = GrbLayerOptions | NgiLayerOptions | GrbWmsLayerOptions;
export interface LayerConfig {
    baseLayers: LayerOptions[];
    overlays: LayerOptions[];
}
export {};
