"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
__export(require("./gis-utils/projection-util"));
__export(require("./gis-utils/map-util"));
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/tabs/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/zoneerder/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/autocomplete/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/gis-utils/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/systemfields/index'));
}
exports.configure = configure;
