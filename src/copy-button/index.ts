import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './copy-button';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./copy-button')
  ]);
}
