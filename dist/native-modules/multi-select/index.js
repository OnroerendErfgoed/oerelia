import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./multi-select'),
        PLATFORM.moduleName('./multi-select-extended')
    ]);
}

//# sourceMappingURL=index.js.map
