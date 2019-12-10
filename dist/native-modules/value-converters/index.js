import { PLATFORM } from 'aurelia-framework';
export * from './date-format';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./date-format')
    ]);
}
