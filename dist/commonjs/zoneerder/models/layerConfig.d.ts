import { LayerType } from './layerConfig.enums';
interface BaseLayerOptions {
    type: LayerType;
    title: string;
    visible?: boolean;
    className?: string;
}
interface GrbOrNgiLayerOptions extends BaseLayerOptions {
    type: LayerType.Ngi | LayerType.GRB;
}
interface WmsLayerOptions extends BaseLayerOptions {
    wmsLayers: string;
}
export interface GrbWmsLayerOptions extends WmsLayerOptions {
    type: LayerType.GrbWMS;
}
export interface ErfgoedWmsLayerOptions extends WmsLayerOptions {
    type: LayerType.ErfgoedWms;
}
export interface DHMVLayerOptions extends BaseLayerOptions {
    type: LayerType.DHMV;
}
export interface OMWRGBMRVLOptions extends BaseLayerOptions {
    type: LayerType.OMWRGBMRVL;
}
export type GrbLayerOptions = GrbOrNgiLayerOptions;
export type NgiLayerOptions = GrbOrNgiLayerOptions;
export type LayerOptions = GrbLayerOptions | NgiLayerOptions | GrbWmsLayerOptions | ErfgoedWmsLayerOptions | DHMVLayerOptions | OMWRGBMRVLOptions;
export interface LayerConfig {
    baseLayers: {
        [layerId: string]: LayerOptions;
    };
    overlays: {
        [layerId: string]: LayerOptions;
    };
}
export {};
