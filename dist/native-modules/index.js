import { PLATFORM } from 'aurelia-framework';
export * from './exports';
export function configure(config) {
    config
        .feature(PLATFORM.moduleName('oerelia/tabs/index'))
        .feature(PLATFORM.moduleName('oerelia/zoneerder/index'))
        .feature(PLATFORM.moduleName('oerelia/autocomplete/index'))
        .feature(PLATFORM.moduleName('oerelia/gis-utils/index'))
        .feature(PLATFORM.moduleName('oerelia/systemfields/index'))
        .feature(PLATFORM.moduleName('oerelia/telefoon-select/index'))
        .feature(PLATFORM.moduleName('oerelia/adres-crab/index'))
        .feature(PLATFORM.moduleName('oerelia/spinner/index'))
        .feature(PLATFORM.moduleName('oerelia/beheer-header/index'))
        .feature(PLATFORM.moduleName('oerelia/beheer-footer/index'))
        .feature(PLATFORM.moduleName('oerelia/multi-select/index'))
        .feature(PLATFORM.moduleName('oerelia/value-converters/index'))
        .feature(PLATFORM.moduleName('oerelia/actor-widget/index'))
        .feature(PLATFORM.moduleName('oerelia/auteur-widget/index'))
        .feature(PLATFORM.moduleName('oerelia/copy-button/index'))
        .feature(PLATFORM.moduleName('oerelia/expander/index'))
        .feature(PLATFORM.moduleName('oerelia/datepicker/index'))
        .feature(PLATFORM.moduleName('oerelia/koppeling-dialog/index'));
}

//# sourceMappingURL=index.js.map
