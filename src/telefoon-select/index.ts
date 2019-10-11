import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './telefoon-select';
export * from './models/telefoon';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./telefoon-select')
  ]);
}
