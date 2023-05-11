import { LayerType } from './layerConfig.enums';
interface BaseLayerOptions {
    type: LayerType;
    title: string;
    visible?: boolean;
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
export declare type GrbLayerOptions = GrbOrNgiLayerOptions;
export declare type NgiLayerOptions = GrbOrNgiLayerOptions;
export declare type LayerOptions = GrbLayerOptions | NgiLayerOptions | GrbWmsLayerOptions | ErfgoedWmsLayerOptions | DHMVLayerOptions | OMWRGBMRVLOptions;
export interface LayerConfig {
    baseLayers: {
        [layerId: string]: LayerOptions;
    };
    overlays: {
        [layerId: string]: LayerOptions;
    };
}
export {};
