import { PLATFORM } from 'aurelia-pal';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./elements/hello-world'),
        PLATFORM.moduleName('./tabs/tabs-header'),
        PLATFORM.moduleName('./tabs/tabs-pane'),
        PLATFORM.moduleName('./tabs/tabs-content')
    ]);
}
