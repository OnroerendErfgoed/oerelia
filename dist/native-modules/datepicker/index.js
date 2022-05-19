import { PLATFORM } from 'aurelia-framework';
export * from './aurelia-pikaday-datepicker';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./aurelia-pikaday-datepicker'),
        PLATFORM.moduleName('./value-converters/date')
    ]);
}

//# sourceMappingURL=index.js.map
