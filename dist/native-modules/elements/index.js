import { PLATFORM } from 'aurelia-framework';
export * from './hello-world';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./hello-world')
    ]);
}
