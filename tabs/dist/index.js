import { PLATFORM } from 'aurelia-pal';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./elements/tabs-content'),
        PLATFORM.moduleName('./elements/tabs-header'),
        PLATFORM.moduleName('./elements/tabs-pane')
    ]);
}
