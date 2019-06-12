import { PLATFORM } from 'aurelia-framework';
export * from './zoneerder';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./zoneerder')
    ]);
}
