"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contour = void 0;
var Contour = (function () {
    function Contour(c) {
        if (c) {
            this.coordinates = c.coordinates;
            this.crs = c.crs;
            this.type = c.type;
        }
    }
    return Contour;
}());
exports.Contour = Contour;

//# sourceMappingURL=contour.js.map
