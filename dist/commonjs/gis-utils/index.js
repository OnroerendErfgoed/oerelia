"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./projection-util"));
__export(require("./map-util"));
__export(require("./components/ol-geolocate"));
__export(require("./components/ol-layerswitcher"));
__export(require("./models/boundingbox"));
__export(require("./models/map-config"));
function configure(config) {
    config.globalResources([]);
}
exports.configure = configure;

//# sourceMappingURL=index.js.map
