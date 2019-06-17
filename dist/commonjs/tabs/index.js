"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
__export(require("./tabs-header"));
__export(require("./tabs-pane"));
__export(require("./tabs-content"));
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./tabs-header'),
        aurelia_framework_1.PLATFORM.moduleName('./tabs-pane'),
        aurelia_framework_1.PLATFORM.moduleName('./tabs-content')
    ]);
}
exports.configure = configure;
