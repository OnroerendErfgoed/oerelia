import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config
        .feature(PLATFORM.moduleName('oerelia/tabs'))
        .feature(PLATFORM.moduleName('oerelia/zoneerder'));
}
