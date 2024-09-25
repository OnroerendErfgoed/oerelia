"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = configure;
var aurelia_framework_1 = require("aurelia-framework");
__exportStar(require("./exports"), exports);
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
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/beheer-header/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/beheer-footer/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/multi-select/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/value-converters/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/actor-widget/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/auteur-widget/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/copy-button/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/expander/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/datepicker/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('oerelia/koppeling-dialog/index'));
}

//# sourceMappingURL=index.js.map
