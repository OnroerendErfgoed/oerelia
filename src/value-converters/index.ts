import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './date-format';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./date-format')
  ]);
}
