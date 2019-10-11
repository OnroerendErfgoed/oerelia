import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './exports';

export function configure(config: FrameworkConfiguration) {
  config
    .feature(PLATFORM.moduleName('oerelia/tabs/index'))
    .feature(PLATFORM.moduleName('oerelia/zoneerder/index'))
    .feature(PLATFORM.moduleName('oerelia/autocomplete/index'))
    .feature(PLATFORM.moduleName('oerelia/gis-utils/index'))
    .feature(PLATFORM.moduleName('oerelia/systemfields/index'))
    .feature(PLATFORM.moduleName('oerelia/telefoon-select/index'))
    .feature(PLATFORM.moduleName('oerelia/adres-crab/index'));
}
