import { PLATFORM } from 'aurelia-framework';
export * from './telefoon-select';
export * from './models/telefoon';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./telefoon-select')
    ]);
}

//# sourceMappingURL=index.js.map
