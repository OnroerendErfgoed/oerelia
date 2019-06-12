import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config
        .feature(PLATFORM.moduleName('oerelia/tabs/index'))
        .feature(PLATFORM.moduleName('oerelia/zoneerder/index'));
}
