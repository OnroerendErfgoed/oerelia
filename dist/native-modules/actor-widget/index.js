import { PLATFORM } from 'aurelia-framework';
export * from './actor-widget';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./actor-widget')
    ]);
}

//# sourceMappingURL=index.js.map
