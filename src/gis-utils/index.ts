import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './projection-util';
export * from './map-util';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./projection-util'),
    PLATFORM.moduleName('./map-util')
  ]);
}
