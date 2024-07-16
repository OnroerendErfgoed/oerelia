import { PLATFORM } from 'aurelia-framework';
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./zoneerder'),
        PLATFORM.moduleName('./components/referentielaag-autocorrectie'),
        PLATFORM.moduleName('./components/zone-vergelijking-dialog')
    ]);
}

//# sourceMappingURL=index.js.map
