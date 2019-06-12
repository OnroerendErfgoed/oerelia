"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/tabs'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/zoneerder'));
}
exports.configure = configure;
