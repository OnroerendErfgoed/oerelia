import { PLATFORM } from 'aurelia-pal';
export function configure(config) {
    config.feature(PLATFORM.moduleName('testplugin/hello-world'));
}
