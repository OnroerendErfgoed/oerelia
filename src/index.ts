import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('oerelia/tabs'))
    .feature(PLATFORM.moduleName('oerelia/zoneerder'));
}
