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
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/multi-select/index'));
}
exports.configure = configure;
