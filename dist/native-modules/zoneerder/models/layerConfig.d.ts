import { LayerType } from './layerConfig.enums';
import { Contour } from './contour';
import { type Geometry } from 'geojson';
interface BaseLayerOptions {
    type: LayerType;
    title: string;
    visible?: boolean;
    className?: string;
    showLegend?: boolean;
}
export interface VectorLayerOptions extends BaseLayerOptions {
    type: LayerType.Vector;
    style: {
        stroke: string;
        fill: string;
        lineDash?: [number, number];
        hashed?: boolean;
    };
    geometries?: Contour[] | Geometry[];
}
interface GrbOrNgiLayerOptions extends BaseLayerOptions {
    type: LayerType.Ngi | LayerType.GRB;
}
export interface WmsLayerOptions extends BaseLayerOptions {
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
export type LayerOptions = VectorLayerOptions | GrbLayerOptions | NgiLayerOptions | GrbWmsLayerOptions | ErfgoedWmsLayerOptions | DHMVLayerOptions | OMWRGBMRVLOptions;
export interface LayerConfig {
    baseLayers: {
        [layerId: string]: LayerOptions;
    };
    overlays: {
        [layerId: string]: LayerOptions;
    };
}
export {};
