import { PLATFORM } from 'aurelia-framework';
export * from './auteur-widget';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./auteur-widget')
    ]);
}

//# sourceMappingURL=index.js.map
