"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./multi-select'),
        aurelia_framework_1.PLATFORM.moduleName('./multi-select-extended')
    ]);
}
exports.configure = configure;

//# sourceMappingURL=index.js.map
