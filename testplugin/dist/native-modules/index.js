import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config.feature(PLATFORM.moduleName('testplugin/elements/index'));
}
