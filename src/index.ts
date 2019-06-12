import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('oerelia/tabs/index'))
    .feature(PLATFORM.moduleName('oerelia/zoneerder/index'));
}
