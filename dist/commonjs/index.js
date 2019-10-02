"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/tabs/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/zoneerder/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/autocomplete/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/gis-utils/index'));
}
exports.configure = configure;
