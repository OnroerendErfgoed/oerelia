import { PLATFORM } from 'aurelia-framework';
export * from './tabs-header';
export * from './tabs-pane';
export * from './tabs-content';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./tabs-header'),
        PLATFORM.moduleName('./tabs-pane'),
        PLATFORM.moduleName('./tabs-content')
    ]);
}
