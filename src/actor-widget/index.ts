import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './actor-widget';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./actor-widget')
  ]);
}
