import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './spinner';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./spinner')
  ]);
}
