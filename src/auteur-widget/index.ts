import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './auteur-widget';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./auteur-widget')
  ]);
}
