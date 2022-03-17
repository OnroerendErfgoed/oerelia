import { LayerType } from './layerConfig.enums';

interface baseLayerOptions {
  type: LayerType;
  id: string;
  title: string;
  visible?: boolean;
  attributions?: string;
}

interface GrbOrNgiLayerOptions extends baseLayerOptions{
  type: LayerType.Ngi | LayerType.Grb;
}

export interface GrbWmsLayerOptions extends baseLayerOptions{
  type: LayerType.GrbWMS;
  wmsLayers: string;
}
export type GrbLayerOptions = GrbOrNgiLayerOptions;
export type NgiLayerOptions = GrbOrNgiLayerOptions;
export type LayerOptions = GrbLayerOptions | NgiLayerOptions | GrbWmsLayerOptions;

export interface LayerConfig {
  baseLayers: LayerOptions[];
  overlays: LayerOptions[];
}
