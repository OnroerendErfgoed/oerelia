import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config
        .feature(PLATFORM.moduleName('oerelia/elements'))
        .feature(PLATFORM.moduleName('oerelia/tabs'));
}
