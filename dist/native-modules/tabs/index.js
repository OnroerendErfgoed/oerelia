import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./tabs-header'),
        PLATFORM.moduleName('./tabs-pane'),
        PLATFORM.moduleName('./tabs-content')
    ]);
}
