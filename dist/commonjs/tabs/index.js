"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = configure;
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./tabs-header'),
        aurelia_framework_1.PLATFORM.moduleName('./tabs-pane'),
        aurelia_framework_1.PLATFORM.moduleName('./tabs-content')
    ]);
}

//# sourceMappingURL=index.js.map
