import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config
        .feature(PLATFORM.moduleName('oerelia/tabs/index'))
        .feature(PLATFORM.moduleName('oerelia/zoneerder/index'))
        .feature(PLATFORM.moduleName('oerelia/autocomplete/index'))
        .feature(PLATFORM.moduleName('oerelia/gis-utils/index'));
}
