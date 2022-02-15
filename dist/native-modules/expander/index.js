import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./expander'),
        PLATFORM.moduleName('./expander-container')
    ]);
}

//# sourceMappingURL=index.js.map
