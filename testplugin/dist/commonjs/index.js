"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
function configure(config) {
    config.feature(aurelia_pal_1.PLATFORM.moduleName('testplugin/hello-world'));
}
exports.configure = configure;
