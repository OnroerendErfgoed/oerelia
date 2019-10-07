import { PLATFORM } from 'aurelia-framework';
export * from './gis-utils/projection-util';
export * from './gis-utils/map-util';
export function configure(config) {
    config
        .feature(PLATFORM.moduleName('oerelia/tabs/index'))
        .feature(PLATFORM.moduleName('oerelia/zoneerder/index'))
        .feature(PLATFORM.moduleName('oerelia/autocomplete/index'))
        .feature(PLATFORM.moduleName('oerelia/gis-utils/index'))
        .feature(PLATFORM.moduleName('oerelia/systemfields/index'));
}
