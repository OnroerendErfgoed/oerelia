import { PLATFORM } from 'aurelia-framework';
export * from './spinner';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./spinner')
    ]);
}
