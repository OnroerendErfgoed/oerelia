import { PLATFORM } from 'aurelia-framework';
export * from './autocomplete';
export * from './autocomplete-type';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./autocomplete')
    ]);
}
