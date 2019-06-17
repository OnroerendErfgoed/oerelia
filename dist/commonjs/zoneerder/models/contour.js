"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
