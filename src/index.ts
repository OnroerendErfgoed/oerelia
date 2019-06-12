import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/hello-world'),
    PLATFORM.moduleName('./tabs/tabs-header'),
    PLATFORM.moduleName('./tabs/tabs-pane'),
    PLATFORM.moduleName('./tabs/tabs-content')
  ]);
}
