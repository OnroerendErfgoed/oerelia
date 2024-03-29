"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
__export(require("./exports"));
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/tabs/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/zoneerder/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/autocomplete/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/gis-utils/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/systemfields/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/telefoon-select/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/adres-crab/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/spinner/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/beheer-header/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/beheer-footer/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/multi-select/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/value-converters/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/actor-widget/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/auteur-widget/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/copy-button/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/expander/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/datepicker/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/koppeling-dialog/index'));
}
exports.configure = configure;

//# sourceMappingURL=index.js.map
