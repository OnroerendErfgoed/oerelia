"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config.feature(aurelia_framework_1.PLATFORM.moduleName('./elements/index'));
}
exports.configure = configure;
