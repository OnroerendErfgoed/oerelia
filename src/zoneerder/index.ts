import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './zoneerder';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./zoneerder')
  ]);
}
