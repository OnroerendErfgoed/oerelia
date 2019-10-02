import { PLATFORM } from 'aurelia-framework';
export * from './systemfields';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./systemfields')
    ]);
}
