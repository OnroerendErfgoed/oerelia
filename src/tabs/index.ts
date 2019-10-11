import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./tabs-header'),
    PLATFORM.moduleName('./tabs-pane'),
    PLATFORM.moduleName('./tabs-content')
  ]);
}
