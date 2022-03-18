import { LayerType } from './layerConfig.enums';

interface BaseLayerOptions {
  type: LayerType;
  title: string;
  visible?: boolean;
}

interface GrbOrNgiLayerOptions extends BaseLayerOptions {
  type: LayerType.Ngi | LayerType.Grb;
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

export type GrbLayerOptions = GrbOrNgiLayerOptions;
export type NgiLayerOptions = GrbOrNgiLayerOptions;
export type LayerOptions = GrbLayerOptions | NgiLayerOptions | GrbWmsLayerOptions | ErfgoedWmsLayerOptions;

export interface LayerConfig {
  baseLayers: { [layerId: string]: LayerOptions }
  overlays: { [layerId: string]: LayerOptions }
}
