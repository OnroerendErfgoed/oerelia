import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('oerelia/elements'))
    .feature(PLATFORM.moduleName('oerelia/tabs'));
}
