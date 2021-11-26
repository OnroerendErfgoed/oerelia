import { FrameworkConfiguration } from 'aurelia-framework';

export * from './projection-util';
export * from './map-util';
export * from './components/ol-geolocate';
export * from './components/ol-layerswitcher';
export * from './models/boundingbox';
export * from './models/map-config';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([]);
}
