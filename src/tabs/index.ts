import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from './tabs-header';
export * from './tabs-pane';
export * from './tabs-content';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./tabs-header'),
    PLATFORM.moduleName('./tabs-pane'),
    PLATFORM.moduleName('./tabs-content')
  ]);
}
