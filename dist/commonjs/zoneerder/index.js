"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
__export(require("./zoneerder"));
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./zoneerder')
    ]);
}
exports.configure = configure;
