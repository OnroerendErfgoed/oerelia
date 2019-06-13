import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './autocomplete';
export * from './autocomplete-type';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./autocomplete')
  ]);
}
