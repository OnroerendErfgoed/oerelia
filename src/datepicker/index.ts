import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
export * from './aurelia-pikaday-datepicker';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./aurelia-pikaday-datepicker'),
    PLATFORM.moduleName('./value-converters/date')
  ]);
}
